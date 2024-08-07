import json
import os

import nltk

import books.his_dark_materials as his_dark_materials
import books.jane_austen as jane_austen
import books.the_expanse as the_expanse

from find_references import find_references

nltk.download("punkt")
nltk.download("averaged_perceptron_tagger")
nltk.download("maxent_ne_chunker")
nltk.download("words")


def generate_data(book_title="his_dark_materials"):
    if book_title == "his_dark_materials":
        people_data = his_dark_materials.people_data.characters
        chapter_names = his_dark_materials.chapter_data.chapter_names
    elif book_title == "jane_austen":
        people_data = jane_austen.people_data.characters
        chapter_names = {}
    elif book_title == "the_expanse":
        people_data = the_expanse.people_data.characters
        chapter_names = {}
    with open(f"./books/{book_title}/raw_text.txt", encoding="utf-8") as file:
        (characters, chapters, relationships, relevant_indexed_sentences) = (
            find_references(file, people_data, chapter_names)
        )

    # Ensure the directory exists
    directory_path = f"../frontend/src/data/{book_title}"
    os.makedirs(directory_path, exist_ok=True)
    with open(f"../frontend/src/data/{book_title}/characters.json", "w") as f:
        f.write(json.dumps(characters))
    with open(f"../frontend/src/data/{book_title}/chapters.json", "w") as f:
        f.write(json.dumps(chapters))
    with open(f"../frontend/src/data/{book_title}/relationships.json", "w") as f:
        f.write(json.dumps(relationships))
    with open(f"../frontend/src/data/{book_title}/indexedSentences.json", "w") as f:
        f.write(json.dumps(relevant_indexed_sentences))


# generate_data("his_dark_materials")
generate_data("jane_austen")
# generate_data("the_expanse")
