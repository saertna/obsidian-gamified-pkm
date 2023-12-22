import os
import json
import shutil
import zipfile
import subprocess
from urllib.parse import urlparse


def zip_files(source_folder, output_zip_path, files_to_zip):
    with zipfile.ZipFile(output_zip_path, 'w') as zip_file:
        for file_to_zip in files_to_zip:
            file_path = os.path.join(source_folder, file_to_zip)
            zip_file.write(file_path, arcname=file_to_zip)



def get_current_version_from_link(content):
    link_start = content.find('https://github.com/saertna/obsidian-gamified-pkm/releases/tag/')
    if link_start == -1:
        return None

    link_end = content.find(')', link_start)
    if link_end == -1:
        link_end = content.find(']', link_start)
    if link_end == -1:
        link_end = len(content)

    link = content[link_start:link_end]
    parsed_url = urlparse(link)
    path_parts = parsed_url.path.split('/')
    current_version = path_parts[-1]
    return current_version


def update_readme_version(readme_path, new_version):
    with open(readme_path, 'r', encoding='utf-8') as readme_file:
        readme_content = readme_file.read()

    old_version = get_current_version_from_link(readme_content)
    if old_version is None:
        print("Unable to extract the current version from the README.md file.")
        return

    old_version_link = f'https://github.com/saertna/obsidian-gamified-pkm/releases/tag/{old_version}'
    new_version_link = f'https://github.com/saertna/obsidian-gamified-pkm/releases/tag/{new_version}'

    updated_readme_content = readme_content.replace(old_version_link, new_version_link)

    with open(readme_path, 'w', encoding='utf-8') as readme_file:
        readme_file.write(updated_readme_content)


def update_json_version(file_path, new_version):
    with open(file_path, 'r') as json_file:
        data = json.load(json_file)

    data['version'] = new_version

    with open(file_path, 'w') as json_file:
        json.dump(data, json_file, indent=2)

#def zip_files(source_folder, output_zip_path):
#    with shutil.ZipFile(output_zip_path, 'w') as zip_file:
#        for root, dirs, files in os.walk(source_folder):
#            for file in files:
#                file_path = os.path.join(root, file)
#                arcname = os.path.relpath(file_path, source_folder)
#                zip_file.write(file_path, arcname=arcname)

def update_constants(constants_path):
    with open(constants_path, 'r', encoding='utf-8') as constants_file:
        constants_content = constants_file.read()

    updated_constants_content = constants_content.replace('export const debugLogs = true;', 'export const debugLogs = false;')

    with open(constants_path, 'w', encoding='utf-8') as constants_file:
        constants_file.write(updated_constants_content)

def main(new_version):
    plugin_folder = '.'
    readme_path = os.path.join(plugin_folder, 'README.md')
    manifest_path = os.path.join(plugin_folder, 'manifest.json')
    package_path = os.path.join(plugin_folder, 'package.json')
    constants_path = os.path.join(plugin_folder, 'src', 'constants.ts')


    # Update README.md
    update_readme_version(readme_path, new_version)

    # Update manifest.json
    update_json_version(manifest_path, new_version)

    # Update package.json
    update_json_version(package_path, new_version)
    
    # Update constants.ts
    update_constants(constants_path)
    
    # Run npm build commands
    try:
        subprocess.run(["npm", "install"], check=True, cwd=plugin_folder, shell=True)
        subprocess.run(["npm", "run", "build"], check=True, cwd=plugin_folder, shell=True)
    except subprocess.CalledProcessError as e:
        print(f"Error running npm commands: {e}")

    # Zip files
    files_to_zip = ['main.js', 'manifest.json', 'styles.css']
    zip_folder = os.path.join(plugin_folder, f'obsidian-gamified-pkm.zip')
    zip_files(plugin_folder, zip_folder, files_to_zip)

    # Move the zip archive to the 'install-zip' subfolder
    install_zip_folder = os.path.join(plugin_folder, 'obsidian-gamified-pkm')
    os.makedirs(install_zip_folder, exist_ok=True)

    # Create the new path for the zip archive in the 'install-zip' folder
    new_zip_path = os.path.join(install_zip_folder, f'obsidian-gamified-pkm.zip')

    # Move the zip archive
    shutil.move(zip_folder, new_zip_path)

if __name__ == "__main__":
    new_version = input("Enter the new version: ")
    main(new_version)
