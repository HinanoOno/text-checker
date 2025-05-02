import re

def check_text(text: str) -> str:
    text = re.sub(r'と思います。|と思われる。', 'と考えられる。', text)
    text = re.sub(r'だと思います。|だと思う。', 'である。', text)
    text = re.sub(r'ではないかと思います。|ではないかと思う。', 'であると考えられる。', text)
    text = re.sub(r'という気がします。|という気がする。', 'のように感じられる。', text)
    text = re.sub(r'なのではないでしょうか。｜なのではないか', 'である可能性がある。', text)
    text = re.sub(r'かもしれません。｜かもしれない。', 'の可能性がある。', text)
    text = re.sub(r'した方がいいです。｜した方がいい。', 'すべきである。', text)
    text = re.sub(r'してほしいです。｜してほしい。', 'することが望ましい。', text)
    text = re.sub(r'は良くないと思います。｜は良くないと思う。', 'は好ましくない。', text)
    text = re.sub(r'が大切だと思います。｜が大切だと思う。', 'が重要である。', text)
    text = re.sub(r'になると思います。｜になると思う。', 'になる。', text)
    return text
  