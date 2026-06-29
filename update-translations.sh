#!/usr/bin/env bash
set -euo pipefail

python3 - "$@" <<'PY'
import json
import re
import sys
import zipfile
from pathlib import Path
import xml.etree.ElementTree as ET


PLACEHOLDER_RE = re.compile(r"###([^#]*)###")


def die(message: str) -> None:
    print(f"Error: {message}", file=sys.stderr)
    raise SystemExit(1)


def normalize_value(value: str) -> str:
    value = value.replace("\\\\n", "\\n")
    value = value.replace("\\\\'", "'")
    return PLACEHOLDER_RE.sub(r"{{\1}}", value)


def parse_strings_xml(xml_bytes: bytes) -> dict:
    root = ET.fromstring(xml_bytes)
    result = {}

    for node in root.findall("string"):
        key = node.get("name")
        if not key:
            continue
        value = "".join(node.itertext())
        result[key] = normalize_value(value)

    return result


def write_json(path: Path, payload: dict) -> None:
    tmp_path = path.with_suffix(path.suffix + ".tmp")
    with tmp_path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
        handle.write("\n")
    tmp_path.replace(path)


def main() -> None:
    if len(sys.argv) != 2:
        die(f"Usage: {Path(sys.argv[0]).name} <downloaded zip file>")

    zip_path = Path(sys.argv[1]).expanduser().resolve()
    if not zip_path.is_file():
        die(f"Zip file not found: {zip_path}")

    repo_root = Path.cwd()
    localization_dir = repo_root / "src" / "assets" / "localization"
    if not localization_dir.is_dir():
        die(f"Destination directory not found: {localization_dir}")

    translations_by_lang = {}
    with zipfile.ZipFile(zip_path) as archive:
        xml_members = sorted(
            member
            for member in archive.namelist()
            if member.startswith("strings/") and member.endswith("/strings.xml")
        )

        if not xml_members:
            die("No strings.xml files found in archive")

        for member in xml_members:
            parts = Path(member).parts
            if len(parts) < 3:
                continue

            lang = parts[1]
            output_file = localization_dir / f"{lang}.json"
            print(f"Updating {output_file} from {member}")

            translations = parse_strings_xml(archive.read(member))
            translations_by_lang[lang] = translations
            write_json(output_file, translations)

    de_path = localization_dir / "de.json"
    en_path = localization_dir / "en.json"
    if de_path.is_file() and en_path.is_file():
        with de_path.open(encoding="utf-8") as de_file:
            de_data = json.load(de_file)
        with en_path.open(encoding="utf-8") as en_file:
            en_data = json.load(en_file)

        merged = dict(de_data)
        merged.update(en_data)
        write_json(en_path, merged)

    print("Translation update finished.")


if __name__ == "__main__":
    main()
PY
