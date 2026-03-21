import re
import base64
from pathlib import Path

def extract_base64_images(html_file, output_dir):
    """Extract all base64 images from HTML and save them as external files."""

    # Read the HTML file
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Create output directory if it doesn't exist
    Path(output_dir).mkdir(parents=True, exist_ok=True)

    # Pattern to match base64 image data
    pattern = r'data:image/(png|jpeg|jpg|gif|svg\+xml|webp);base64,([A-Za-z0-9+/=]+)'

    # Find all matches
    matches = re.finditer(pattern, html_content)

    # Counter for naming files
    image_counter = 1
    replacements = []

    for match in matches:
        image_type = match.group(1)
        base64_data = match.group(2)
        full_match = match.group(0)

        # Decode base64 data
        try:
            image_data = base64.b64decode(base64_data)

            # Determine file extension
            if image_type == 'svg+xml':
                ext = 'svg'
            elif image_type == 'jpeg':
                ext = 'jpg'
            else:
                ext = image_type

            # Generate filename
            filename = f"image_{image_counter:02d}.{ext}"
            filepath = Path(output_dir) / filename

            # Save image file
            with open(filepath, 'wb') as img_file:
                img_file.write(image_data)

            print(f"Extracted: {filename}")

            # Store replacement info
            replacements.append((full_match, f"images/{filename}"))

            image_counter += 1

        except Exception as e:
            print(f"Error decoding image {image_counter}: {e}")
            continue

    # Replace base64 data with file paths in HTML
    for old_data, new_path in replacements:
        html_content = html_content.replace(old_data, new_path)

    # Write updated HTML
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"\nTotal images extracted: {len(replacements)}")
    print(f"Updated {html_file} with image references")

if __name__ == "__main__":
    extract_base64_images("index.html", "images")
