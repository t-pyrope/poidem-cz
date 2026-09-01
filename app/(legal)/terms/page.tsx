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

export default function TermsPage() {
  return (
    <Box component="main">
      <AppHeader />
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 5 }, my: 2 }}>
          <Stack spacing={4}>
            <Box>
              <Typography component="h1" variant="h3" gutterBottom>
                Условия использования
              </Typography>
              <Typography color="text.secondary">
                Последнее обновление: 1 сентября 2026 года
              </Typography>
            </Box>

            <Section title="1. О сервисе">
              <Typography>
                Сайт «Пойдём — афиша мероприятий в Праге» предоставляет
                пользователям информацию о мероприятиях, проходящих в Праге, и
                позволяет зарегистрированным пользователям предлагать
                мероприятия для публикации.
              </Typography>
              <Typography>Сервис предоставляется:</Typography>
              <Typography component="address" sx={{ fontStyle: "normal" }}>
                <strong>Marmalade skies s.r.o.</strong>
                <br />
                IČO: 24372901
                <br />
                Bělehradská 858/23
                <br />
                120 00 Praha
                <br />
                Czech Republic
                <br />
                E-mail: hello@marmaladeskies.dev
              </Typography>
            </Section>

            <Section title="2. Регистрация">
              <Typography>
                Для добавления мероприятий необходимо создать аккаунт или войти
                с использованием поддерживаемого сервиса авторизации.
              </Typography>
              <Typography>
                Пользователь обязан предоставлять достоверную информацию и не
                передавать доступ к своему аккаунту другим лицам.
              </Typography>
            </Section>

            <Section title="3. Добавление мероприятий">
              <Typography>
                Пользователь может предложить мероприятие для публикации на
                сайте.
              </Typography>
              <Typography>
                Публикация мероприятия{" "}
                <strong>не является автоматической</strong>. Marmalade skies
                s.r.o. вправе проверить предоставленную информацию и отказать в
                публикации либо удалить опубликованное мероприятие, если оно:
              </Typography>
              <List component="ul" sx={{ listStyleType: "disc", pl: 3 }}>
                {[
                  "содержит недостоверную или вводящую в заблуждение информацию;",
                  "нарушает законодательство;",
                  "нарушает права третьих лиц;",
                  "не соответствует тематике сайта;",
                  "содержит рекламу или иной нежелательный материал.",
                ].map((item) => (
                  <ListItem
                    key={item}
                    component="li"
                    sx={{ display: "list-item", py: 0.25, pl: 0.5 }}
                  >
                    <Typography>{item}</Typography>
                  </ListItem>
                ))}
              </List>
              <Typography>
                Для пользователей с соответствующей ролью мероприятие может
                публиковаться автоматически.
              </Typography>
            </Section>

            <Section title="4. Ответственность за информацию">
              <Typography>
                Пользователь несёт ответственность за достоверность
                предоставленной им информации о мероприятии и за наличие
                необходимых прав на размещаемые материалы.
              </Typography>
              <Typography>
                Marmalade skies s.r.o. не является организатором мероприятий,
                если прямо не указано иное.
              </Typography>
              <Typography>
                Информация о мероприятиях предоставляется для ознакомления.
                Пользователю рекомендуется проверять актуальность информации у
                организатора мероприятия.
              </Typography>
            </Section>

            <Section title="5. Контент">
              <Typography>
                Передавая текст, изображения и другие материалы для публикации,
                пользователь подтверждает, что имеет право их использовать и
                разрешает Marmalade skies s.r.o. использовать их для работы и
                продвижения сайта.
              </Typography>
            </Section>

            <Section title="6. Ограничение доступа">
              <Typography>
                Мы можем ограничить или прекратить доступ к аккаунту, если
                пользователь нарушает настоящие Условия или применимое
                законодательство.
              </Typography>
            </Section>

            <Section title="7. Изменение условий">
              <Typography>
                Мы можем изменять настоящие Условия. Актуальная версия всегда
                доступна на сайте.
              </Typography>
            </Section>

            <Section title="8. Контакты">
              <Typography>
                По вопросам работы сайта и настоящих Условий:
              </Typography>
              <Typography
                component="a"
                href="mailto:hello@marmaladeskies.dev"
                color="primary.main"
              >
                <strong>hello@marmaladeskies.dev</strong>
              </Typography>
            </Section>
          </Stack>
        </Paper>
      </Container>
      <AppFooter />
    </Box>
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
