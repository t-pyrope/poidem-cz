import { Tag } from "@/app/types";

export const getTagName = (tag: Tag) => {
  switch (tag) {
    case "festival":
      return "Фестиваль";
    case "workshop":
      return "Воркшоп";
    case "film":
      return "Кино";
    case "performance":
      return "Перформанс";
    case "komentovaná prohlídka":
      return "Кураторская экскурсия";
    case "výstava":
      return "Выставка";
    case "diskuze":
      return "Дискуссия";
    case "charita":
      return "Благотворительность";
    case "děti":
      return "Для детей";
    default:
      return tag;
  }
};
