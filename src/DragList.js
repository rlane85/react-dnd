import React, { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";

const DragDropContextContainer = styled.div`
  padding: 20px;
  /* border: 4px solid indianred; */
  border-radius: 6px;
  max-width: 1050px;
  margin: 5px auto;
  background-color: "#384959";
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 8px;
  overflow-x: auto;
  max-width: 1050px;
`;

const HeadText = styled.h1`
  color: white;
`;

// fake data generator
const getItems = (count, prefix) =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.random();
    return {
      id: `item-${randomId}`,
      prefix,
      content: `Write a Blogpost for DAOHelper`,
      text:
        "lorem lipsem is the best lorem lipsem to second the blind truth of the first section to get best."
    };
  });

//remove from list
const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

//add in the list
const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

//lists
const lists = ["openBounties", "inProgress", "underReview", "done"];

//generate lists data
const generateLists = () =>
  lists.reduce(
    (acc, listKey) => ({ ...acc, [listKey]: getItems(10, listKey) }),
    {}
  );

//set colors accordingly to list
const setListsColor = (lists) => {
  const hashMap = {};
  for (let item in lists) {
    if (item === "openBounties") {
      hashMap[item] = lists[item].map((item) => ({
        ...item,
        color: "#b8bab8"
      }));
    } else if (item === "inProgress") {
      hashMap[item] = lists[item].map((item) => ({
        ...item,
        color: "#546fab"
      }));
    } else if (item === "underReview") {
      hashMap[item] = lists[item].map((item) => ({
        ...item,
        color: "#800080"
      }));
    } else if (item === "done") {
      hashMap[item] = lists[item].map((item) => ({
        ...item,
        color: "#46bd42"
      }));
    }
  }
  return hashMap;
};

function DragList() {
  const [elements, setElements] = React.useState(generateLists());

  useEffect(() => {
    const listItems = setListsColor(generateLists());
    setElements(listItems);
  }, []);

  //on drag end
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    const d = listCopy[result.destination.droppableId]
    console.log("d :: ", d)

    const finalList = setListsColor(listCopy);

    setElements(finalList);
  };

  return (
    <DragDropContextContainer>
      <center>
        <HeadText>Bounties</HeadText>
        <hr />
      </center>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {lists.map((listKey) => (
            <DraggableElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
}

export default DragList;
