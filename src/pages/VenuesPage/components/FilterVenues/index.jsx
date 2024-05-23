import React from "react";
import { Modal } from "react-bootstrap";
import { FormContainer, FormGroup } from "../../../../components/Form";
import { Select, Option, Input } from "../../../../components/Input";
import Button from "../../../../components/Button";

const FilterVenues = ({
  modalIsOpen,
  setIsOpen,
  filter,
  setFilter,
  additionalFilters,
  setAdditionalFilters,
}) => {
  const closeModal = () => setIsOpen(false);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAdditionalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const handleModalSave = () => {
    setIsOpen(false);
  };

  return (
    <Modal show={modalIsOpen} onHide={closeModal}>
      <FormContainer formHeading="Filter Venue" closeModal={closeModal}>
        <FormGroup>
          <Select onChange={handleFilterChange} value={filter || ""}>
            <Option value={""}>Default</Option>
            <Option value={"rating"}>Best Rated</Option>
            <Option value={"popular"}>Most Popular</Option>
            <Option value={"recent"}>Added Recently</Option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Input
            className="checkbox"
            type="checkbox"
            id="wifi"
            name="wifi"
            isLabel={true}
            label="Wifi"
            checked={additionalFilters.wifi}
            onChange={handleCheckboxChange}
          />
          <Input
            className="checkbox"
            type="checkbox"
            id="parking"
            name="parking"
            isLabel={true}
            label="Parking"
            checked={additionalFilters.parking}
            onChange={handleCheckboxChange}
          />
          <Input
            className="checkbox"
            type="checkbox"
            id="breakfast"
            name="breakfast"
            isLabel={true}
            label="Breakfast"
            checked={additionalFilters.breakfast}
            onChange={handleCheckboxChange}
          />
          <Input
            className="checkbox"
            type="checkbox"
            id="pets"
            name="pets"
            isLabel={true}
            label="Pets"
            checked={additionalFilters.pets}
            onChange={handleCheckboxChange}
          />
        </FormGroup>
        <Button type="button" onClick={handleModalSave}>
          Save Changes
        </Button>
      </FormContainer>
    </Modal>
  );
};

export default FilterVenues;
