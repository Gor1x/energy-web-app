import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";
import TableCSV from './TableCSV';
import CodeEditor from "./CodeEditor";


const TabContent = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { file } = props;

    const Item = ({ children, columns, rows }) => {
        return (
            <Box sx={{ boxShadow: 3 }}
                backgroundColor={colors.primary[400]}
                gridColumn={`span ${columns}`}
                gridRow={`span ${rows}`}>
                {children}
            </Box>
        )
    };

    const AlgorithmTabContent = ({ }) => <>
        {/* ROW 1 */}
        <Item rows={5} columns={6}>
            <CodeEditor file={file} />
        </Item>
        <Item rows={3} columns={6} />
        <Item rows={2} columns={6} />
    </>

    const DatasetTabContent = ({ }) => <>
        {/* ROW 1 */}
        <Item
            columns={8}
            rows={4}
            backgroundColor={colors.primary[400]}
        >
            <TableCSV
                sizePerPage={7}
                totalSize={file.num_rows}
                url={`datasets/data/${file.id}`} />
        </Item>
        <Item rows={2} columns={4} />
        <Item rows={2} columns={4} />
    </>;

    return (
        <Box>
            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="100px"
                gap="20px"
            >
                {file.type == "algorithm" ? <AlgorithmTabContent /> : <DatasetTabContent />}
            </Box>
        </Box>
    );
};

export default TabContent;