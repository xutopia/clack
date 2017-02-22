import React from 'react'
import { connect } from 'react-redux';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Directory from '../containers/Directory';

const Room = () => (
  <Split separator={true}>
    <Sidebar
      direction="row"
      size='medium'
      justify='start'
      align='center'
      wrap={true}
      pad='medium'
      margin='small'
      colorIndex='light-2'
    >
    Sidebar
      <Header>
      Header goes here
      </Header>
        <Directory>
        Directory Goes Here
        </Directory>
    </Sidebar>
    <Box
      direction='row'
      justify='start'
      align='center'
      wrap={true}
      pad='medium'
      margin='small'
      colorIndex='light-2'
    >
    Box
    </Box>
  </Split>
);
// return (
//   <Split separator={true}>
//     <Sidebar>Sidebar
//     </Sidebar>
//     <Box>Box
//     </Box>
//   </Split>
//
// )

export default connect()(Room);
