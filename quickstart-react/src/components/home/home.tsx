import * as React from 'react';
import { Component } from 'react';
import { images } from '../../constans';
import Card from '../cards/Card';
import Modal from '../modal/Modal';
import { HomeBody,ContentDiv, TopLine, MainTitle, SubTitle } from './homeStyle';

interface HomeProps {
    
}
 
const Home: React.FC<HomeProps> = () => {
    return ( 
      <HomeBody>
    <TopLine>
      <div className="headlines">
      <MainTitle>Today's best items</MainTitle>
      <SubTitle>
        You can save 24 trees by trading 1 t-shirt today!
      </SubTitle>
      </div>
      <Modal/>
    </TopLine>
    <ContentDiv>
        <Card
          name="ZARA t-shirt"
          description="Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet"
          owner="ofek ben david"
          images={images}
          interested_list={["alon gilad", "or levi", "ofek ben", "asff", "dsgfh"]}
          phone_number="23456"
          published_at={new Date().toDateString()}
        />
        <Card
          name="Ikea sofa"
          description="asdf Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor sametg"
          owner="ofek ben david"
          interested_list={["alon gilad", "or levi", "ofek ben", "asff", "dsgfh"]}
          phone_number="23456"
          published_at={new Date().toDateString()}
        />
        <Card
          name="Ikea sofa"
          description="asdf Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor sametg"
          owner="ofek ben david"
          interested_list={["alon gilad", "or levi", "ofek ben", "asff", "dsgfh"]}
          phone_number="23456"
          published_at={new Date().toDateString()}
        />
        <Card
          name="Ikea sofa"
          description="asdf Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor samet Popover message will appear here loremipsum dolor sametg"
          owner="ofek ben david"
          interested_list={["alon gilad", "or levi", "ofek ben", "asff", "dsgfh"]}
          phone_number="23456"
          published_at={new Date().toDateString()}
        />
    </ContentDiv>
    </HomeBody>
     );
}
 
export default Home;