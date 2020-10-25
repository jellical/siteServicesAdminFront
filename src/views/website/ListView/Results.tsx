import React, {useCallback, useEffect} from 'react'
import {Link as RouterLink, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  Box,
  Card,
  Divider,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core'
import {
  ArrowRight as ArrowRightIcon,
} from 'react-feather'


import { fetchWebSites } from 'src/slices/website'
import { RootState } from 'src/store'
import { WebSite } from 'src/types/WebSite'
import LoadingFallback from '../../../components/LoadingFallback'


const useStyles = makeStyles((theme) => ({
  root: {},
  headerRow: {
    height: 60,
    fontWeight: 500
  }
}))

const Results = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles()
  const websites = useSelector((state:RootState)=>state.website.list)
  const isUpdating = useSelector((state:RootState)=>state.website.isUpdating)

  const getWebSites = useCallback(async () => {
    try {
      dispatch(fetchWebSites());

    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    getWebSites();
  }, [getWebSites]);


  if(isUpdating) {
    return <LoadingFallback />
  }

  return (
    <Card
      className={classes.root}
    >
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table size='small'>
            <TableHead>
              <TableRow
                className={classes.headerRow}
              >
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  URL
                </TableCell>
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {websites.map((webSite:WebSite) => {
                return (
                  <TableRow
                    hover
                    key={webSite.id}
                  >
                    <TableCell onClick={() => history.push(`/websites/${webSite.id}`)}>
                        {webSite.title}
                    </TableCell>
                    <TableCell onClick={() => history.push(`/websites/${webSite.id}`)}>
                        {webSite.url}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to={`/websites/${webSite.id}`}
                      >
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default Results;
