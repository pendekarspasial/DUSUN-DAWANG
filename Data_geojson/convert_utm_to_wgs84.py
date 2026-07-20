"""
Konversi GeoJSON dari UTM EPSG:32749 (Zone 49S) ke WGS84 (lat/lng)
Jalankan: python convert_utm_to_wgs84.py
"""
import json, math, os

# UTM Zone 49S parameters (EPSG:32749)
# WGS84 ellipsoid
a  = 6378137.0          # semi-major axis
f  = 1/298.257223563    # flattening
k0 = 0.9996             # scale factor
E0 = 500000.0           # false easting
N0 = 10000000.0         # false northing (southern hemisphere)
lon0 = math.radians(111.0)  # central meridian zone 49 = 111°E

b  = a * (1 - f)
e2 = 2*f - f**2
e  = math.sqrt(e2)
n  = (a - b)/(a + b)

def utm_to_wgs84(E, N):
    """Convert UTM Zone 49S easting/northing to WGS84 lat/lng degrees."""
    N_val = N - N0  # adjust for southern hemisphere
    M = N_val / k0
    mu = M / (a * (1 - e2/4 - 3*e2**2/64 - 5*e2**3/256))
    
    e1 = (1 - math.sqrt(1-e2)) / (1 + math.sqrt(1-e2))
    phi1 = mu + (3*e1/2 - 27*e1**3/32)*math.sin(2*mu) + \
                (21*e1**2/16 - 55*e1**4/32)*math.sin(4*mu) + \
                (151*e1**3/96)*math.sin(6*mu) + \
                (1097*e1**4/512)*math.sin(8*mu)
    
    sp = math.sin(phi1)
    cp = math.cos(phi1)
    tp = sp/cp
    
    N1 = a / math.sqrt(1 - e2*sp**2)
    T1 = tp**2
    C1 = e2/(1-e2) * cp**2
    R1 = a*(1-e2) / (1-e2*sp**2)**1.5
    D  = (E - E0) / (N1*k0)
    
    lat = phi1 - (N1*tp/R1) * (D**2/2 - (5 + 3*T1 + 10*C1 - 4*C1**2 - 9*(e2/(1-e2)))*D**4/24 +
                                (61 + 90*T1 + 298*C1 + 45*T1**2 - 252*(e2/(1-e2)) - 3*C1**2)*D**6/720)
    lng = lon0 + (D - (1 + 2*T1 + C1)*D**3/6 +
                  (5 - 2*C1 + 28*T1 - 3*C1**2 + 8*(e2/(1-e2)) + 24*T1**2)*D**5/120) / cp
    
    return math.degrees(lat), math.degrees(lng)


def convert_coord(coord):
    """Convert a single [E, N] pair to [lng, lat]."""
    E, N = coord[0], coord[1]
    lat, lng = utm_to_wgs84(E, N)
    return [round(lng, 8), round(lat, 8)]


def convert_geometry(geom):
    """Recursively convert geometry coordinates."""
    if geom['type'] == 'Point':
        geom['coordinates'] = convert_coord(geom['coordinates'])
    elif geom['type'] in ('MultiPoint', 'LineString'):
        geom['coordinates'] = [convert_coord(c) for c in geom['coordinates']]
    elif geom['type'] in ('MultiLineString', 'Polygon'):
        geom['coordinates'] = [[convert_coord(c) for c in ring] for ring in geom['coordinates']]
    elif geom['type'] in ('MultiPolygon',):
        geom['coordinates'] = [[[convert_coord(c) for c in ring] for ring in poly] for poly in geom['coordinates']]
    return geom


files = ['aoi_dawang.geojson', 'aoi_rt.geojson', 'perangkatdesa.geojson', 'rumah.geojson', 'sawah.geojson']

for fname in files:
    fpath = os.path.join(os.path.dirname(__file__), fname)
    if not os.path.exists(fpath):
        print(f"  SKIP (not found): {fname}")
        continue
    
    with open(fpath, 'r') as f:
        data = json.load(f)
    
    # Remove UTM CRS declaration
    data.pop('crs', None)
    data.pop('xy_coordinate_resolution', None)
    
    for feature in data.get('features', []):
        if feature.get('geometry'):
            feature['geometry'] = convert_geometry(feature['geometry'])
    
    out_path = os.path.join(os.path.dirname(__file__), 'wgs84_' + fname)
    with open(out_path, 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"  OK: {fname} -> wgs84_{fname}")

print("\nDone! File WGS84 sudah dibuat.")
print("Contoh koordinat aoi_dawang (titik pertama):")

# Quick test
with open(os.path.join(os.path.dirname(__file__), 'aoi_dawang.geojson'), 'r') as ff:
    d = json.load(ff)
    pt = d['features'][0]['geometry']['coordinates'][0][0][0]
    lat, lng = utm_to_wgs84(pt[0], pt[1])
    print(f"  UTM: E={pt[0]:.2f}, N={pt[1]:.2f}")
    print(f"  WGS84: lat={lat:.6f}, lng={lng:.6f}")
