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
    case "studenti":
      return "Для студентов";
    case "lecture":
      return "Лекции";
    case "language":
      return "Языковые встречи";
    case "sport":
      return "Спорт";
    case "dance":
      return "Танцы";
    case "music":
      return "Музыка";
    case "networking":
      return "Нетворкинг";
    case "meetup":
      return "Тематические встречи";
    case "literature":
      return "Литература";
    case "quiz":
      return "Квизы и викторины";
    case "market":
      return "Маркеты и ярмарки";
    case "food":
      return "Гастрономические мероприятия";
    case "tour":
      return "Экскурсии";
    case "conference":
      return "Конференции";
    case "party":
      return "Вечеринки";
    default:
      return tag;
  }
};
