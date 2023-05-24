import logo from './logo.svg';
import './App.css';
import axios from "axios"
import { useEffect, useState } from 'react';
import 'antd/dist/reset.css';

import { Button, Space, Table, Modal, Form, Input} from 'antd';
import { useForm } from 'antd/es/form/Form';


function App() {

  const [membersList, setMembersList] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null);
 
  // const addForm = useForm();
  // const editForm = useForm();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => selectMember(record)}>Edit </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  
  

  useEffect(() => {
    getMembers()
  },[])

  const selectMember = (member) => {
    setSelectedMember(member);
    setIsUpdateModalOpen(true)
  }

  const getMembers = async() =>{
    try {
      const response = await axios.get("http://localhost:8000/members");
      const { data }  = response?.data?.data
      if(data?.length >0){
        setMembersList(data)
      }else{
        console.log("No members found");
      }
    } catch (error) {
      console.log(error)
    } 
  }


  const AddMember = () => {
    console.log("Add member")
    // validateFields().then(values => {
    //   // Do something with value
    //   console.log(values)
    // });
  }

  const UpdateMember = () => {
    
  }

  const DeleteMember = () => {
    
  }


  const closeAddModal = () => {
    setIsAddModalOpen(false)
  }

  const closeEditModal = () => {
    setIsUpdateModalOpen(false)
  }

  return (
      <div style={{ margin: "20px"}} >
        <div style={{ textAlign: "center"}}>
          <h2>Cloudnloud Team Members</h2>
        </div>
        <Button type='primary' style={{ float: "right", marginBottom: "10px"}} onClick={() => setIsAddModalOpen(true)}>Add Member</Button>
        <Table columns={columns} dataSource={membersList} />


        <Modal 
          title="Create Member" 
          open={isAddModalOpen} 
          onOk={AddMember} 
          okText={"submit"}
          onCancel={closeAddModal}
        >
         <Form
            // form={addForm}
            name="basic"
            layout="vertical"
            style={{ padding: "20px"}}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please enter your city!' }]}
            >
              <Input />
            </Form.Item>
           
          </Form>
        </Modal>

        <Modal 
        title="Update Member" 
        open={isUpdateModalOpen} 
        onOk={UpdateMember} 
        okText={"Update"}
        onCancel={closeEditModal}>
        <Form
            // form={editForm}
            name="basic"
            layout="vertical"
            style={{ padding: "20px"}}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please enter your city!' }]}
            >
              <Input />
            </Form.Item>
           
          </Form>
        </Modal>
      </div>
  );
}

export default App;
