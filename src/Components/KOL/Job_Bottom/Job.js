import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { DOMAIN_API } from '../../../config/const'
import Job_Card from './Job_Card'

export default function LabTabs({ value_parent, categories_parent }) {
  const [value, setValue] = React.useState('1');
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  let actoken = localStorage.access_token;

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  async function getAllCate() {
    setLoading(true);
    try {
      let url1 = "";
      url1 = DOMAIN_API + `categories/all-cate`;
      await fetch(url1, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": actoken
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            setValue(result[0]?.id)
            let temp = [];
            for (let i = 0; i < result.length - 3; i++) {
              temp.push(result[i]);
            }
            temp.push(result[result.length - 1]);
            setCategories(temp);
            setLoading(false);
          }
        )
    }
    catch (error) {
      console.log("error: ", error)
    }
    finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getAllCate();
  }, [])


  return (
    <div sx={{ width: '100%' }}>
      {loading ?
        <div>
          Đang tải dữ liệu
        </div>
        :
        <div >
          <TabContext value={value} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                // scrollButtons="auto"
                // variant="scrollable"
                onChange={handleChange} aria-label="lab API tabs example" centered
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#00B14F",
                    textColor: "#00B14F",
                    indicatorColor: "#00B14F",
                    marginLeft: "0px",
                    justifyContent: 'center',
                    alignItems: 'center',
                  },

                }} sx={{
                  color: "#00B14F", justifyContent: 'center',
                  alignItems: 'center', maxWidth: "100%", marginLeft: "20px"
                }}>
                {categories.length > 0 && categories.map((cate, index) => (
                  <Tab key={{ index }} sx={{ marginLeft: "0px",}}
                    label={<span style={{ fontWeight: "500" }}> {cate.name} </span>}
                    value={cate.id} />
                ))}

              </TabList>
            </Box>

            {categories.length > 0 && categories.map((cate, index) => (
              <TabPanel key={{ index }} value={cate.id}><Job_Card id={cate.id} name={cate.name} /></TabPanel>
            ))}

          </TabContext>
        </div>

      }
    </div>
  );


}
