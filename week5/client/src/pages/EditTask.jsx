import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import showToast from "../utils/customToast";
import * as taskApi from "../api/taskApi";

const EditTask = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [task, setTask] = useState({});

  const getSingleTask = async () => {
    try {
      const { data } = await taskApi.getSingleTask(params.id);
      setTask(data.data.task);
    } catch (error) {
      showToast("error", `${error.response.data.message}. Quay lại sau 5s`);
      setTimeout(() => {
        navigate("/todo");
      }, 5000);
    }
  };
  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      await taskApi.updateTask(params.id, task.title, task.desc);
      console.log("hello");
      showToast("success", "Cập nhật thành công");
      setTimeout(() => {
        navigate("/todo");
      }, 5000);
    } catch (error) {
      showToast("error", error.response.data.message);
    }
  };
  useEffect(() => {
    getSingleTask();
  }, []);
  return (
    <div className='wrapper'>
      <form onSubmit={updateHandler}>
        <div className='task-input'>
          <input
            id='title'
            type='text'
            placeholder='Title...'
            name='title'
            required
            maxLength='30'
            value={task && task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </div>
        <div className='task-input'>
          <input
            id='description'
            type='text'
            placeholder='Description...'
            name='desc'
            required
            maxLength='120'
            value={task && task.desc}
            onChange={(e) => setTask({ ...task, desc: e.target.value })}
          />
        </div>
        <div className='controls'>
          <div className='filters'></div>
          <button className='add-btn' type='submit'>
            Edit task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
