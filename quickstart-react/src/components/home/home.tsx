import * as React from 'react';
import { Component } from 'react';
import { images } from '../../constants';
import Card from '../cards/Card';
import { ContentDiv } from './homeStyle';

interface HomeProps {
    
}
 
const Home: React.FC<HomeProps> = () => {
    return ( <ContentDiv>
        {/* <Card
          name="ZARA t-shirt"
          description="Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet"
          // owner="ofek ben david"
          // images={images}
          // interested={["alon gilad", "or levi", "ofek ben", "asff", "dsgfh"]}
          phone_number="23456"
          published_at={new Date().toDateString()}
        />
        <Card
          name="Ikea sofa"
          description="asdf Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor sametg"
          // owner="ofek ben david"
          // interested={["alon gilad", "or levi", "ofek ben", "asff", "dsgfh"]}
          phone_number="23456"
          published_at={new Date().toDateString()}
        />
        <Card
          name="Ikea sofa"
          description="asdf Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor sametg"
          // owner="ofek ben david"
          // interested={["alon gilad", "or levi", "ofek ben", "asff", "dsgfh"]}
          phone_number="23456"
          published_at={new Date().toDateString()}
        />
        <Card
          name="Ikea sofa"
          description="asdf Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor sametg"
          // owner="ofek ben david"
          // interested={["alon gilad", "or levi", "ofek ben", "asff", "dsgfh"]}
          phone_number="23456"
          published_at={new Date().toDateString()}
      />
      <CardList/> */}
    </ContentDiv> );
}
 
export default Home;