import React from "react";
import styled from "styled-components";

import Chats from "./components/Chats";
import "./_app.scss";

function App() {
  return (
    <Main>
      <Chats />
    </Main>
  );
}

const Main = styled.main`
  padding: 6em 18em;
  display: flex;
  flex-direction: column;
  gap: 3em;
`;

export default App;
