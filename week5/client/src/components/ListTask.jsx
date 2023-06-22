import React, { useState } from "react";
import Loading from "./Loading";
import MemoizedTaskItem from "./MemoizedTaskItem";
import showToast from "../utils/customToast";
import * as taskApi from "../api/taskApi";

const ListTask = ({ getAllTask, list, loading }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (title && desc) {
        setCreateLoading(true);
        await taskApi.createTask(title, desc);
        await getAllTask();
        setDesc("");
        setTitle("");
        setCreateLoading(false);
        showToast("success", "Tạo task thành công");
      }
    } catch (err) {
      setCreateLoading(false);
      showToast("error", err.response.data.message);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={submitHandler}>
        <div className='task-input'>
          <input
            id='title'
            type='text'
            placeholder='Title...'
            name='title'
            maxLength='30'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='task-input'>
          <input
            id='description'
            type='text'
            placeholder='Description...'
            name='description'
            maxLength='120'
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className='controls'>
          <button type='submit' className='add-btn flex items-center'>
            {createLoading && <Loading />}
            Create task
          </button>
        </div>
      </form>

      <ul className='task-box'>
        {loading && <Loading />}
        {!loading && list.length === 0 && (
          <span>You don't have any task here</span>
        )}
        {!loading &&
          list.length !== 0 &&
          list
            .filter(
              (item) =>
                item.user_id ===
                JSON.parse(localStorage.getItem("userInfo")).user.id
            )
            .map((item) => (
              <MemoizedTaskItem
                key={item.id}
                item={item}
                getAllTask={getAllTask}
              />
            ))}
      </ul>
    </div>
  );
};

export default ListTask;
