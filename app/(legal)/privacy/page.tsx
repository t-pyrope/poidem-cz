import {
  Box,
  Container,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { AppHeader } from "@/app/components/AppHeader";
import { AppFooter } from "@/app/components/AppFooter";

const accountData = [
  "адрес электронной почты;",
  "идентификатор пользователя;",
  "пароль в защищённом виде, если используется регистрация по паролю;",
  "информацию о способе входа через Google или GitHub;",
  "идентификатор аккаунта пользователя у соответствующего провайдера.",
];

export default function PrivacyPage() {
  return (
    <Box component="main">
      <AppHeader />
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 5 }, my: 2 }}>
          <Stack spacing={4}>
            <Box>
              <Typography component="h1" variant="h3" gutterBottom>
                Политика конфиденциальности
              </Typography>
              <Typography color="text.secondary">
                Последнее обновление: 1 сентября 2026 года
              </Typography>
            </Box>

            <Section title="1. Кто обрабатывает ваши данные">
              <Typography>
                Сайт «Пойдём — афиша мероприятий в Праге» управляется:
              </Typography>
              <Address includeId />
              <Email />
              <Typography>
                В настоящей Политике «мы» означает Marmalade skies s.r.o.
              </Typography>
            </Section>
            <Section title="2. Какие данные мы обрабатываем">
              <Typography>
                При создании аккаунта мы можем обрабатывать:
              </Typography>
              <BulletList items={accountData} />
              <Typography>
                При добавлении мероприятия мы также обрабатываем информацию,
                которую пользователь самостоятельно предоставляет через сайт.
              </Typography>
              <Typography>
                Мы не запрашиваем и не стремимся собирать специальные категории
                персональных данных.
              </Typography>
            </Section>
            <Section title="3. Для чего мы используем данные">
              <Typography>Мы используем персональные данные для:</Typography>
              <BulletList
                items={[
                  "создания и управления аккаунтом;",
                  "аутентификации пользователя;",
                  "предоставления возможности предлагать мероприятия;",
                  "проверки и публикации предложенных мероприятий;",
                  "связи с пользователем по вопросам предложенных мероприятий;",
                  "отправки необходимых технических сообщений;",
                  "обеспечения безопасности сайта и предотвращения злоупотреблений;",
                  "выполнения требований законодательства.",
                ]}
              />
              <Typography>
                Мы не продаём персональные данные пользователей.
              </Typography>
            </Section>
            <Section title="4. Правовые основания обработки">
              <Typography>
                В зависимости от конкретной цели обработки мы можем обрабатывать
                персональные данные на основании:
              </Typography>
              <BulletList
                items={[
                  "необходимости предоставления запрошенных пользователем услуг;",
                  "выполнения юридических обязанностей;",
                  "наших законных интересов, например обеспечения безопасности сервиса;",
                  "согласия пользователя, когда оно требуется.",
                ]}
              />
            </Section>
            <Section title="5. Вход через Google и GitHub">
              <Typography>
                Пользователь может войти в аккаунт с помощью Google или GitHub.
              </Typography>
              <Typography>
                При таком входе соответствующий сервис передаёт нам данные,
                необходимые для аутентификации и создания аккаунта. Мы не
                получаем пароль пользователя от Google или GitHub.
              </Typography>
              <Typography>
                Обработка данных Google и GitHub регулируется соответствующими
                политиками конфиденциальности этих сервисов.
              </Typography>
            </Section>
            <Section title="6. Сторонние поставщики услуг">
              <Typography>
                Для работы сайта мы используем следующие сервисы:
              </Typography>
              <ProviderList />
              <Typography>
                Эти поставщики могут обрабатывать персональные данные в объёме,
                необходимом для предоставления соответствующих услуг.
              </Typography>
            </Section>
            <Section title="7. Передача данных в другие страны">
              <Typography>
                Некоторые используемые нами поставщики услуг могут обрабатывать
                данные за пределами страны проживания пользователя, в том числе
                за пределами Европейской экономической зоны.
              </Typography>
              <Typography>
                В таких случаях мы принимаем предусмотренные применимым
                законодательством меры для обеспечения надлежащей защиты
                персональных данных.
              </Typography>
            </Section>
            <Section title="8. Cookies">
              <Typography>
                Сайт не использует cookies для рекламы, аналитики или
                отслеживания поведения пользователей.
              </Typography>
              <Typography>
                Для авторизации и поддержания пользовательской сессии могут
                использоваться технически необходимые механизмы хранения данных,
                если они требуются для работы соответствующей функции.
              </Typography>
            </Section>
            <Section title="9. Срок хранения данных">
              <Typography>
                Мы храним данные аккаунта до тех пор, пока аккаунт существует и
                данные необходимы для работы сервиса.
              </Typography>
              <Typography>
                Пользователь может обратиться к нам с просьбой удалить аккаунт и
                связанные с ним персональные данные.
              </Typography>
              <Typography>
                После удаления аккаунта мы удаляем или обезличиваем персональные
                данные, если их дальнейшее хранение не требуется
                законодательством либо необходимо для разрешения споров, защиты
                наших прав или выполнения иных законных обязанностей.
              </Typography>
              <Typography>
                Информация об опубликованных мероприятиях может сохраняться
                отдельно от аккаунта, если это необходимо для функционирования
                публичного каталога.
              </Typography>
            </Section>
            <Section title="10. Права пользователей">
              <Typography>
                Мы предоставляем{" "}
                <strong>
                  всем пользователям сайта независимо от страны их нахождения
                </strong>{" "}
                возможность обратиться к нам с просьбой:
              </Typography>
              <BulletList
                items={[
                  "предоставить информацию о хранящихся персональных данных;",
                  "исправить неточные данные;",
                  "удалить персональные данные;",
                  "ограничить их обработку;",
                  "предоставить данные в переносимом формате, если это применимо;",
                  "возразить против определённых способов обработки;",
                  "отозвать согласие, если обработка основана на согласии.",
                ]}
              />
              <Typography>
                Некоторые права могут быть ограничены применимым
                законодательством.
              </Typography>
              <Typography>
                Для реализации своих прав можно обратиться по адресу:
              </Typography>
              <Email />
              <Typography>
                Мы можем запросить дополнительную информацию, необходимую для
                подтверждения личности заявителя.
              </Typography>
            </Section>
            <Section title="11. Безопасность">
              <Typography>
                Мы принимаем разумные технические и организационные меры для
                защиты персональных данных от несанкционированного доступа,
                изменения, раскрытия, уничтожения и другой неправомерной
                обработки.
              </Typography>
            </Section>
            <Section title="12. Изменения Политики">
              <Typography>
                Мы можем изменять настоящую Политику конфиденциальности.
                Актуальная версия всегда доступна на сайте.
              </Typography>
            </Section>
            <Section title="13. Контакты">
              <Address />
              <Email />
            </Section>
          </Stack>
        </Paper>
      </Container>
      <AppFooter />
    </Box>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <List component="ul" sx={{ listStyleType: "disc", pl: 3 }}>
      {items.map((item) => (
        <ListItem
          key={item}
          component="li"
          sx={{ display: "list-item", py: 0.25, pl: 0.5 }}
        >
          <Typography>{item}</Typography>
        </ListItem>
      ))}
    </List>
  );
}

function ProviderList() {
  const providers = [
    ["Vercel", "размещение сайта и серверной инфраструктуры;"],
    ["Neon", "хранение данных в базе данных;"],
    [
      "Resend",
      "отправка электронных писем, включая уведомления о предложенных мероприятиях.",
    ],
  ];
  return (
    <List component="ul" sx={{ listStyleType: "disc", pl: 3 }}>
      {providers.map(([name, description]) => (
        <ListItem
          key={name}
          component="li"
          sx={{ display: "list-item", py: 0.25, pl: 0.5 }}
        >
          <Typography>
            <strong>{name}</strong> — {description}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}

function Address({ includeId = false }: { includeId?: boolean }) {
  return (
    <Typography component="address" sx={{ fontStyle: "normal" }}>
      <strong>Marmalade skies s.r.o.</strong>
      <br />
      {includeId && (
        <>
          IČO: 24372901
          <br />
        </>
      )}
      Bělehradská 858/23
      <br />
      120 00 Praha
      <br />
      Czech Republic
    </Typography>
  );
}

function Email() {
  return (
    <Typography
      component="a"
      href="mailto:hello@marmaladeskies.dev"
      color="primary.main"
    >
      <strong>hello@marmaladeskies.dev</strong>
    </Typography>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Stack component="section" spacing={2}>
      <Typography component="h2" variant="h5">
        {title}
      </Typography>
      {children}
    </Stack>
  );
}
