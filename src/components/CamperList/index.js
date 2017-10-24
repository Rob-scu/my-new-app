import React, {Component} from 'react'
import {Header, Image, Table} from 'semantic-ui-react'

class CamperList extends Component {
  state = { campers: [] }
  async componentDidMount(){
    const prom = await fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
    const col = await prom.json()
    console.log(col)
    this.setState({campers: col})
  }
  render() {
    const { campers } = this.state
    return (
      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Employee</Table.HeaderCell>
            <Table.HeaderCell>All Time Score</Table.HeaderCell>
            <Table.HeaderCell>Last Update</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {campers.sort((camperA, camperB) => {
            return camperA.alltime - camperB.alltime
          }).reverse().map((camper) => {
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
                {camper.lastUpdate}
              </Table.Cell>
            </Table.Row>
          })}

        </Table.Body>
      </Table>
    )
  }
}

export default CamperList
