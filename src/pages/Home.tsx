import { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const HomePage = () => {
  const [moodData, setMoodData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    // Handle form submission, add mood data to state, and close modal
    setMoodData([...moodData, values]);
    setIsModalVisible(false);
  };

  return (
    <Box p="24px">
      <h1>Dashboard</h1>
      {/* Render mood data */}
      <Box>
        {moodData.map((mood, index) => (
          <Box key={index}>
            <p>
              {mood.date}: {mood.mood}
            </p>
          </Box>
        ))}
      </Box>
      {/* Button to add new mood */}
      <Button
        colorScheme="blue"
        onClick={showModal}
        leftIcon={<AddIcon />}
      >
        Add Mood
      </Button>
      {/* Modal for adding mood */}
      <Modal isOpen={isModalVisible} onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Mood</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Mood</FormLabel>
              <Select name="mood" rules={[{ required: true, message: 'Please select mood!' }]}>
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Angry">Angry</option>
                <option value="Excited">Excited</option>
                <option value="Calm">Calm</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onFinish}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HomePage;
