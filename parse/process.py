import json
import re

import humre
import nltk

import people_data

nltk.download("punkt")
nltk.download("averaged_perceptron_tagger")
nltk.download("maxent_ne_chunker")
nltk.download("words")


def find_possible_people():
    people = {}

    def add_people(sentence):
        for l in re.findall(r"\w\s[A-Z][a-z]+", sentence):
            people[l[2:]] = True

    with open("./raw_text/full_text.txt", encoding="utf-8") as f:
        for line in f:
            add_people(line)

    people_list = [*people.keys()]
    people_list.sort()
    print(people_list)


# find_possible_people()


characters = {
    "Lyra": {"count": 0, "char_count": [], "other_names": ["Lizzie", "Silvertounge"]},
    "Asriel": {"count": 0, "char_count": []},
    "Roger": {"count": 0, "char_count": []},
    "Yambe-Akka": {"count": 0, "char_count": []},
    "Will": {
        "count": 0,
        "char_count": [],
        "other_names": ["William", "Mark"],
        "disqualifiers": ["Will you", "Will I", "Will he", "Will she"],
    },
    "Pantalaimon": {"count": 0, "char_count": [], "other_names": ["Pan"]},
    "Mrs. Coulter": {
        "count": 0,
        "char_count": [],
        "disqualifiers": ["Mr. Coulter"],
        "other_names": ["Marisa", "Coulter"],
    },
    "Lord Faa": {"count": 0, "char_count": []},
    "Farder Coram": {"count": 0, "char_count": []},
    "Ma Costa": {"count": 0, "char_count": [], "other_names": ["Mrs. Costa"]},
    "Billy": {"count": 0, "char_count": []},
    "Father MacPhail": {
        "count": 0,
        "char_count": [],
        "other_names": ["MacPhail"],
        "disqualifiers": ["Hugh MacPhail"],
    },
    "Sir Charles": {
        "count": 0,
        "char_count": [],
        "other_names": ["Latrom"],
    },
    "lorek Byrnison": {
        "count": 0,
        "char_count": [],
        "other_names": ["lorek", "Byrnison", "Iorek"],
    },
    "John Parry": {
        "count": 0,
        "char_count": [],
        "other_names": ["Parry", "Stanislaus", "Grumman", "Johnny", "John", "Jopari"],
        "disqualifiers": [
            "Mrs. Parry",
            "Will Parry",
            "William Parry",
            "Johnny Fiorelli",
            "John Faa",
            "growed up, John",
        ],
    },
}


for name in people_data.double_names:
    [first, last] = name.split(" ")
    characters[name] = {"count": 0, "char_count": [], "other_names": [first, last]}


for name in people_data.single_names:
    characters[name] = {"count": 0, "char_count": []}


def has_word(text: str, word: str):
    return re.search(rf"\b{word}\b", text)


with open("./raw_text/full_text.txt", encoding="utf-8") as f:
    char_count = 0
    chapter = 0
    book = 0
    for line in f:
        if "~~~ CHAPTER" in line:
            chapter += 1
        if "~~~ BOOK" in line:
            book += 1
            chapter = 0
        sentences = nltk.tokenize.sent_tokenize(line)
        for sentence in sentences:
            char_count += len(sentence)
            sentence_lower = sentence.lower()
            for name, character in characters.items():
                in_sentence = any(
                    name
                    for name in character.get("other_names", [])
                    if has_word(sentence, name)
                )
                disqualifiers = any(
                    name
                    for name in character.get("disqualifiers", [])
                    if has_word(sentence, name)
                )

                if (has_word(sentence, name) or in_sentence) and not disqualifiers:
                    character["count"] += 1
                    pad_num = "0" if chapter < 10 else ""
                    character["char_count"].append(
                        {
                            "char_count": char_count,
                            "sentence": sentence,
                            "chapter": float(f"{book}.{pad_num}{chapter}"),
                        }
                    )

with open("../app/src/data/characters.json", "w") as f:
    f.write(json.dumps(characters))
