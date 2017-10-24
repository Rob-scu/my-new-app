import React, { Component } from 'react'
import { Header, Image, Table } from 'semantic-ui-react'

class CamperList extends Component {
  state = { campers: [], sortBy: 'username', asc: 1 }

  async componentDidMount() {
    const prom = await fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
    const col = await prom.json()
    console.log(col)
    this.setState({ campers: col })
  }

  handleHeaderClick = (sortBy) => {
    if (sortBy === this.state.sortBy) {
      this.setState({ asc: this.state.asc * -1 })
    }
    else {
      this.setState({ asc: 1, sortBy })
    }

  }

  render() {
    const { campers, sortBy, asc } = this.state
    return (
      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              onClick={() => this.handleHeaderClick('username')}>Employee</Table.HeaderCell>
            <Table.HeaderCell onClick={() => this.handleHeaderClick('alltime')}>All
              Time Score</Table.HeaderCell>
            <Table.HeaderCell onClick={() => this.handleHeaderClick('lastUpdate')}>Last
              Update</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {campers.sort((camperA, camperB) => {
            console.log(camperA[sortBy], camperB[sortBy])
            return camperA[sortBy] > camperB[sortBy] ? 1 * asc : -1 * asc
          }).map((camper) => {
            return <Table.Row key={camper.username}>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src={camper.img} shape='rounded'
                         size='mini' />
                  <Header.Content>
                    {camper.username}
                    <Header.Subheader>{camper.recent}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                {camper.alltime}
              </Table.Cell>
              <Table.Cell>
                {new Date(camper.lastUpdate).toString()}
              </Table.Cell>
            </Table.Row>
          })}

        </Table.Body>
      </Table>
    )
  }
}

export default CamperList
