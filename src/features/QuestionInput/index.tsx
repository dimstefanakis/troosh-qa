import { EditablePreview, Editable, EditableInput } from "@chakra-ui/editable";

function QuestionInput(){
    return (
      <Editable
        placeholder="asdadasd"
        marginTop="90px"
        width="100%"
        maxW="80%"
        fontSize="xl"
      >
        <EditablePreview w="100%"/>
        <EditableInput w="100%"/>
      </Editable>
    );
}

export default QuestionInput;
