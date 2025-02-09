import React from 'react';
import {
  Alert,
  Button,
  Form,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalFooter,
  Text,
  TextArea,
  hubspot,
} from '@hubspot/ui-extensions';

// Define the extension to be run within the Hubspot CRM
hubspot.extend<'crm.record.tab'>(({ actions }) => (
  <FormModal actions={actions} />
));

// Define the FormModal component.
const FormModal = ({ actions }) => {
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState('');

  return (
    <>
      <Text>
        HubSpot recommends having forms inside overlays like Modals and Panels
        to keep the main view clean and easy to navigate.
      </Text>
      <Button
        overlay={
          <Modal
            id="modal-form-example"
            title="Dialog Header"
            width="lg"
            onClose={() => {
              setFormSubmitted(false);
            }}
          >
            <Form
              onSubmit={(e) => {
                // Print out the form data when the form is submitted.
                console.log(e.targetValue);
                setFormSubmitted(true);
              }}
            >
              <ModalBody>
                <Text>
                  When we got all the 0's and 1's lined up, a link will show up
                  in your{' '}
                  <Link href="https://knowledge.hubspot.com/user-management/how-to-set-up-user-notifications-in-hubspot">
                    Notification Center
                  </Link>
                  . Also, just to be sure, you're gonna get a confirmation
                  email.
                </Text>
                {
                  // Display a success message when the form is submitted.
                  formSubmitted ? (
                    <Alert title="Success" variant="success">
                      Account created successfully.
                    </Alert>
                  ) : (
                    <>
                      <Input name="first_name" label="First Name" />
                      <Input name="last_name" label="Last Name" />
                      <Input
                        name="email"
                        label="Email"
                        value={email}
                        required
                        placeholder="name@domain.com"
                        description="We'll never share your email with anyone else."
                        tooltip="Your email is only used for support and account purposes."
                        onChange={setEmail}
                      />
                      <TextArea
                        name="notes"
                        label="Notes"
                        placeholder="Add any notes about the account here."
                      />
                    </>
                  )
                }
              </ModalBody>
              <ModalFooter>
                {!formSubmitted && (
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={email === ''}
                  >
                    Submit
                  </Button>
                )}
                <Button
                  onClick={() => actions.closeOverlay('modal-form-example')}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        }
      >
        Display Form
      </Button>
    </>
  );
};
