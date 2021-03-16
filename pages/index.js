import React from 'react'
import { Container, Box, Heading, Grid } from 'theme-ui'
import tt from 'tinytime'
import { Event } from '../components/event'

function index({ months }) {
  return (
    <>
      <Box
        as="header"
        sx={{
          bg: 'sheet',
          color: 'primary',
          textAlign: 'center',
          pt: [4, 5],
          mb: [3, 4],
          pb: 3,
          px: 3
        }}
      >
        <Heading as="h1" variant="title">
          Events this year
        </Heading>
      </Box>
      <Container>
        {Object.keys(months).map(key => (
          <>
            <Heading variant="headline" sx={{ color: 'primary' }}>
              {tt(`{MMMM} {YYYY}`).render(new Date(key))}
            </Heading>
            <Grid columns={[null, 2, 4]} gap={[3, 4]} sx={{ mb: [3, 4] }}>
              {months[key].map(event => (
                <Event {...event} key={event.id} />
              ))}
            </Grid>
          </>
        ))}
      </Container>
    </>
  )
}

export default index

export const getStaticProps = async () => {
  const { getEvents } = require('../lib/data')
  const { groupBy, filter } = require('lodash')
  let events = await getEvents()
  //filter past months
  /* events = filter(
    events,
    e =>
      new Date(new Date(e.end.substring(0, 7)).toISOString().substring(0, 7)) >=
      new Date(new Date().toISOString().substring(0, 7))
  ) */
  const months = groupBy(events, e => e.start.substring(0, 7))
  return { props: { months } }
}
