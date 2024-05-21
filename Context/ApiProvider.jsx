import React, { createContext, useContext, useState } from "react";

const ApiContext = createContext({
  workspaces: [],
  boards: [],
  lists: [],
  cards: [],
  members: [],
  resetBoards: () => {},
  resetLists: () => {},
  resetCards: () => {},
  fetchData: () => {},
  createData: () => {},
  updateData: () => {},
  deleteData: () => {},
  closeList: () => {}
  });

const ApiProvider = ({ children }) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [boards, setBoards] = useState([]);
    const [lists, setLists] = useState([]);
    const [cards, setCards] = useState([]);
 
    const resetData = (setter) => {
      setter([]);
    };
    const resetBoards = () => resetData(setBoards);
    const resetLists = () => resetData(setLists);
    const resetCards = () => resetData(setCards);

    const performRequest = ({ url, method, params, setter, id }) => {
      return fetch(url, { method, body: JSON.stringify(params) })
        .then(response => response.json())
        .then(data => {
          switch (method) {
            case 'GET':
              setter(data);
              break;
            case 'POST':
              setter(prevData => [...prevData, data]);
              break;
            case 'PUT':
              setter(prevData => prevData.map(item => item.id === data.id ? data : item));
              break;
            case 'DELETE':
              setter(prevData => prevData.filter(item => item.id !== id));
              break;
            default:
              break;
          }
          return data;
        })
        .catch(error => console.error(error));
    };

        // Fetch data
    const fetchData = ({ apiPath, params, setter }) => {
      const url = `https://api.trello.com/1/${apiPath}?${new URLSearchParams(params)}`;
      performRequest({ url, method: 'GET', setter });
    };

    // Create data
    const createData = ({ apiPath, params, setter }) => {
      const url = `https://api.trello.com/1/${apiPath}?${new URLSearchParams(params)}`;
      performRequest({ url, method: 'POST', params, setter });
    };

    // Update data
    const updateData = ({ apiPath, params, setter, id }) => {
      const url = `https://api.trello.com/1/${apiPath}/${id}?${new URLSearchParams(params)}`;
      console.log(url)
      performRequest({ url, method: 'PUT', params, setter });
    };

    // Delete data
    const deleteData = ({ apiPath, params, setter, id }) => {
      const url = `https://api.trello.com/1/${apiPath}/${id}?${new URLSearchParams(params)}`;
      performRequest({ url, method: 'DELETE', params, setter, id });
    };

    // Close list
    const closeList = async ({ id, params, setter, idBoard }) => {
      const url = `https://api.trello.com/1/lists/${id}/closed?${new URLSearchParams(params)}`;
      await performRequest({ url, method: 'PUT', params, setter })
      
      const fetchDataParams = { ...params };
      delete fetchDataParams.value;

      const response = await fetch(`https://api.trello.com/1/boards/${idBoard}/lists?${new URLSearchParams(fetchDataParams)}`);
      const data = await response.json();
      setter(data);
    };

    //add member to card  
    const addMemberToCard = async ({ idCard, params }) => {
      const url = `https://api.trello.com/1/cards/${idCard}/idMembers?${new URLSearchParams(params)}`;
      performRequest({ url, method: 'POST' });
    };

    return (
      <ApiContext.Provider
        value={{
            workspaces,
            boards,
            lists,
            cards,

            setWorkspaces,
            setBoards,
            setLists,
            setCards,

            resetBoards,
            resetLists,
            resetCards,

            fetchData,
            createData,
            updateData,
            deleteData,
            closeList,
            addMemberToCard

              }}
      >
        {children}
      </ApiContext.Provider>
    );
  };
  
  export const ApiState = () => {
    return useContext(ApiContext);
  };
  
  export default ApiProvider;