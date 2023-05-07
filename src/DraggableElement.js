import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import styled from "styled-components";

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
  color: white;
  background-color: gray;
  border-radius: 4px;
  padding-top: 3px;
  h3 {
    padding-left: 5px;
  }
`;

const DroppableStyles = styled.div`
  padding: 10px;
  background: rgb(58, 41, 75);
  padding: 10px;
`;

//list colors div style
const divLineStyle = (bgColor) => ({
  width: "100%",
  backgroundColor: bgColor,
  height: "7px",
  borderRadius: "0 0 4px 4px"
});

// render divs accordingly
const renderPrefix = (prefix) => {
  const color =
    prefix === "openBounties"
      ? "#b8bab8"
      : prefix === "inProgress"
      ? "#546fab"
      : prefix === "underReview"
      ? "#800080"
      : "#46bd42";
  return (
    <ColumnHeader>
      <h3>{prefix}</h3>
      <div style={divLineStyle(color)} />
    </ColumnHeader>
  );
};

const DraggableElement = ({ prefix, elements }) => (
  <DroppableStyles>
    {renderPrefix(prefix)}
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements.map((item, index) => (
            <ListItem key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DroppableStyles>
);

export default DraggableElement;
