import React, { Component } from "react";
import sha256 from "sha.js";
import moment from "moment";
import styled from "styled-components";

class Block {
  index: number;
  timestamp: string;
  data: string;
  prevHash: string;
  hash: string;

  static genesis() {
    return new Block(
      0,
      "Genesis Block",
      sha256("sha256")
      .update("0")
      .digest("hex")
    );
  }

  constructor(index: number, data: string, prevHash: string) {
    this.index = index;
    this.timestamp = moment.utc().toString();
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.generateHash();
  }

  generateHash(): string {
    return sha256("sha256")
    .update(
      this.index.toString() + this.timestamp + this.data + this.prevHash
    )
    .digest("hex");
  }
}

type State = {
  chain: Array<Block>,
};

class Blockchain extends Component<void, State> {
  state = {
    chain: [Block.genesis()],
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => {
        const { index, hash } = prevState.chain[prevState.chain.length - 1];

        return {
          ...prevState,
          chain: [
            ...prevState.chain,
            new Block(
              index + 1,
              `Your browser just mined coin ${index + 1} of Jack Coin.`,
              hash
            ),
          ],
        };
      });

      window.scrollTo(0, document.body.scrollHeight);
    }, 2000);
  }

  render() {
    const style = {borderRadius:'50%'}
    return (
      <CenteredColumn>
        <Intro>💰 Welcome to Jack Coin 💰</Intro>
        <About>Jack Coin is a new type of crypto-currency built on a train between London and Leeds.
          Jack Coin will be upending a financial system near you soon! 💅 </About>
        {this.state.chain.map(
          b =>
          b.index >= 1 ? (
            <CenteredColumn key={b.index}>
                <img
                  src={require("./assets/images/jack.jpg")}
                  height={50}
                  width={50}
                  style={style}
                  alt="Jack Icon"
                />
              <BlockContainer>
                <pre>
                  <code>{JSON.stringify(b, null, 2)}</code>
                </pre>
              </BlockContainer>
            </CenteredColumn>
          ) : (
            <BlockContainer key={b.index}>
              <pre>
                <code>{JSON.stringify(b, null, 2)}</code>
              </pre>
            </BlockContainer>
          )
        )}
      </CenteredColumn>
    );
  }
}

const CenteredColumn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
flex: 1;
`;

const BlockContainer = styled.div`
flex: 1;
display: flex;
flex-direction: column;
color: #333;
border: 2px solid #333;
margin: 1rem 0.5rem;
border-radius: 0.25rem;
padding: 0.25rem;
`;

const Intro = styled.h2`
  font-family: Arial;
`;

const About = styled.p`
  display: flex;
  font-family: Arial;
`;

export default Blockchain;
