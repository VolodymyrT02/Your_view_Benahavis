#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
PUBLIC.mkdir(exist_ok=True)

sizes = {
    "favicon-512.png": 512,
    "apple-touch-icon.png": 180,
    "favicon-32.png": 32,
}

def draw_icon(size: int) -> Image.Image:
    bg = (255, 255, 255, 255)
    trunk_color = (176, 108, 60, 255)
    leaf_color = (46, 181, 103, 255)
    accent_color = (34, 160, 191, 200)

    img = Image.new("RGBA", (size, size), bg)
    d = ImageDraw.Draw(img)

    # subtle sun behind leaves
    sun_radius = size * 0.22
    sun_center = (size * 0.28, size * 0.28)
    d.ellipse([
        sun_center[0] - sun_radius,
        sun_center[1] - sun_radius,
        sun_center[0] + sun_radius,
        sun_center[1] + sun_radius,
    ], fill=accent_color)

    # trunk
    trunk_width = size * 0.12
    trunk_height = size * 0.45
    trunk_top = size * 0.38
    trunk_left = size / 2 - trunk_width / 2
    d.rectangle([
        trunk_left,
        trunk_top,
        trunk_left + trunk_width,
        trunk_top + trunk_height
    ], fill=trunk_color)

    # trunk base shadow
    base_height = size * 0.06
    d.ellipse([
        trunk_left - trunk_width,
        trunk_top + trunk_height - base_height / 2,
        trunk_left + trunk_width * 2,
        trunk_top + trunk_height + base_height
    ], fill=(210, 210, 210, 255))

    # leaves - three main fronds
    center_x = size / 2
    center_y = trunk_top
    frond_length = size * 0.32
    frond_width = size * 0.14

    for angle in (-35, -5, 25, 55, -70):
        rad = angle * 3.14159 / 180
        end_x = center_x + frond_length * __import__('math').cos(rad)
        end_y = center_y + frond_length * __import__('math').sin(rad)
        ctrl_x = (center_x + end_x) / 2
        ctrl_y = (center_y + end_y) / 2 - frond_width

        d.polygon([
            (center_x, center_y),
            (ctrl_x + frond_width * __import__('math').sin(rad), ctrl_y - frond_width * __import__('math').cos(rad)),
            (end_x, end_y),
            (ctrl_x - frond_width * __import__('math').sin(rad), ctrl_y + frond_width * __import__('math').cos(rad)),
        ], fill=leaf_color)

    return img

for name, size in sizes.items():
    img = draw_icon(size)
    target = PUBLIC / name
    img.save(target)
    print("generated", target)

# create ICO from 32px png
png32 = PUBLIC / "favicon-32.png"
ico_path = PUBLIC / "favicon.ico"
Image.open(png32).save(ico_path, sizes=[(32, 32), (16, 16)])
print("generated", ico_path)
