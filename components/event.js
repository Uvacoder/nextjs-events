import { Text, Heading, Card, Box, Flex, Avatar } from 'theme-ui'
import Link from 'next/link'
import tt from 'tinytime'

const past = dt => new Date(dt) < new Date()

export const Event = ({ slug, title, leader, avatar, start, end, cal }) => {
  return (
    <Link href={'/[slug]'} as={`/${slug}`} passHref>
      <Card as="a" sx={{ textDecoration: 'none', p: [2, 3] }}>
        <Box
          sx={{
            bg: past(start) ? 'muted' : 'primary',
            color: 'white',
            m: -3,
            py: 2,
            px: 3,
            mb: 2
          }}
        >
          <Heading variant="subheadline" sx={{ my: 0 }}>
            {title}
          </Heading>
        </Box>
        <Text>
          {tt(' {Do} {MM}  {h}:{mm}').render(new Date(start))}-
          {tt('{h}:{mm} {a}').render(new Date(end))}
        </Text>
        <Flex sx={{ alignItems: 'center', color: 'muted', my: 2 }}>
          <Avatar
            src={avatar}
            alt={`${leader} profile picture`}
            size={24}
            sx={{ mx: 2 }}
          />
          <Text as="span">{leader}</Text>
        </Flex>
      </Card>
    </Link>
  )
}
