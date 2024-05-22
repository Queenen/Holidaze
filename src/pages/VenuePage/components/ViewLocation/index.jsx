import React from "react";
import { Input } from "../../../../components/Input";
import { FormContainer, FormGroup } from "../../../../components/Form";
import Button from "../../../../components/Button";

const ViewLocationModal = ({ venue, onClose }) => {
  if (!venue || !venue.location) {
    return null;
  }

  return (
    <div>
      <div>
        <FormContainer formHeading="Venue Location" closeModal={onClose}>
          <FormGroup>
            <div className="d-flex flex-column gap-3">
              <Input
                isLabel={true}
                label="Address"
                value={
                  venue.location.address
                    ? `${venue.location.address}`
                    : "Undefined"
                }
                disabled
              />
              <Input
                isLabel={true}
                label="City"
                value={
                  venue.location.city ? `${venue.location.city}` : "Undefined"
                }
                disabled
              />
              <Input
                isLabel={true}
                label="Zip Code"
                value={
                  venue.location.zip ? `${venue.location.zip}` : "Undefined"
                }
                disabled
              />
              <Input
                isLabel={true}
                label="Country"
                value={
                  venue.location.country
                    ? `${venue.location.country}`
                    : "Undefined"
                }
                disabled
              />
              <Input
                isLabel={true}
                label="Continent"
                value={
                  venue.location.continent
                    ? `${venue.location.continent}`
                    : "Undefined"
                }
                disabled
              />
            </div>
          </FormGroup>
          <Button onClick={onClose}>Close</Button>
        </FormContainer>
      </div>
    </div>
  );
};

export default ViewLocationModal;
