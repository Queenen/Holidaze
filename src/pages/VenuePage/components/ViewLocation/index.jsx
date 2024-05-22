import React from "react";
import { Input } from "../../../../components/Input";
import { FormContainer, FormGroup } from "../../../../components/Form";
import Button from "../../../../components/Button";

const ViewLocationModal = ({ venue, onClose }) => {
  if (!venue || !venue.location) {
    return null;
  }

  const { address, city, zip, country, continent } = venue.location;

  return (
    <FormContainer formHeading="Venue Location" closeModal={onClose}>
      <FormGroup>
        <div className="d-flex flex-column gap-3">
          <Input
            isLabel={true}
            label="Address"
            value={address || "Undefined"}
            disabled
          />
          <Input
            isLabel={true}
            label="City"
            value={city || "Undefined"}
            disabled
          />
          <Input
            isLabel={true}
            label="Zip Code"
            value={zip || "Undefined"}
            disabled
          />
          <Input
            isLabel={true}
            label="Country"
            value={country || "Undefined"}
            disabled
          />
          <Input
            isLabel={true}
            label="Continent"
            value={continent || "Undefined"}
            disabled
          />
        </div>
      </FormGroup>
      <Button onClick={onClose}>Close</Button>
    </FormContainer>
  );
};

export default ViewLocationModal;
