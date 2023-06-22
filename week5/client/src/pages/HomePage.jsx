import React, { useEffect, useState } from "react";
import ListTask from "../components/ListTask";
import Header from "../components/Header";
import * as taskApi from "../api/taskApi";

const HomePage = () => {
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllTask = async () => {
    try {
      setLoading(true);
      const { data } = await taskApi.getAllTask(status, title);
      setLoading(false);
      setList(data.data.list);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllTask();
  }, []);
  return (
    <>
      <Header
        status={status}
        title={title}
        setStatus={setStatus}
        setTitle={setTitle}
        getAllTask={getAllTask}
      />
      <ListTask getAllTask={getAllTask} list={list} loading={loading} />
    </>
  );
};

export default HomePage;
