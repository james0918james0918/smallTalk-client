import React from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle
} from 'reactstrap';

export default (props) => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src="" alt="Caption" />
        <CardBody>
          <CardTitle>{ props.teamName }</CardTitle>
          <CardText>{ props.teamDescription }</CardText>
        </CardBody>
      </Card>
    </div>
  );
};
