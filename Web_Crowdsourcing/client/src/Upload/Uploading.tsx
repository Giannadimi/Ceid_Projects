import React from 'react';
import {Uploader,Container,Content,Header,Sidebar} from 'rsuite';

const UploadingURL="http://localhost:5000/upload";

//----------------------------------------------------------------
function Uploading() {
  return (
    <div className="App">
         <Container>
          <Sidebar>Sidebar</Sidebar>
          <Container>
                <Header>
                  <h2>Page Title</h2>
                </Header>
                <Content>
                  <Uploader action={UploadingURL} draggable>
                    <div style={{lineHeight:'100px'}}>Click or Drag files to this area to upload</div>
                  </Uploader>
                </Content>
              </Container>
          </Container>

    </div>
  );
}

export default Uploading;
