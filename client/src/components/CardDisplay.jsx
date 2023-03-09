import React, { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import { CardComponent } from './'
import { getPresets } from '../actions/presets'
import { useStateContext } from '../context/ContextProvider'

const CardDisplay = () => {
  const { presetsState, setPresetsState } = useStateContext()
  const [presets, setPresets] = useState([])
  useEffect(() => {
    const fetchPresets = async () => {
      const res = await getPresets();
      setPresets(res);
    }
    fetchPresets()
  }, []);

  useEffect(() => {
    setPresetsState(presets)
  }, [presets]);

  useEffect(() => {
    if(presetsState.length > presets.length) {
      setPresets(presetsState)
    };
  }, [presetsState]);

  return (
    <Box sx={{ width: '100%', height: '100%', flexGrow: 1, p: 4 }}>
    <Box>
      <Grid container spacing={2}>
        {presets?.map((preset) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={preset._id} sx={{ marginBottom: '20px' }}>
            <CardComponent preset={preset} />
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
  )
}

export default CardDisplay