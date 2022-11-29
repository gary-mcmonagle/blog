import {
  Card,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
type AddNewContentRowDialogProps = {
  open: boolean;
  setToClose: () => void;
  setRequiredColumnsOnNewRow: (num: number) => void;
};
export const AddNewContentRowDialog = ({
  open,
  setToClose,
  setRequiredColumnsOnNewRow,
}: AddNewContentRowDialogProps) => (
  <Dialog open={open} onClose={setToClose}>
    <Card style={{ minWidth: 200 }}>
      <FormControl>
        <FormLabel>Columns</FormLabel>
        <RadioGroup
          row
          defaultValue={1}
          onChange={(event) => {
            setRequiredColumnsOnNewRow(parseInt(event.target.value));
          }}
        >
          {[1, 2, 3, 4].map((cols) => (
            <FormControlLabel value={cols} control={<Radio />} label={cols} />
          ))}
        </RadioGroup>
      </FormControl>
    </Card>
  </Dialog>
);
