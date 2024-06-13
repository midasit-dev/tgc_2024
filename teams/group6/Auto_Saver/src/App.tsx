/**
 * Generated by Moaui DevTools
 * Created at 2024. 6. 12. 오전 10:52:13
 */

import React from 'react';
import Moaui from '@midasit-dev/moaui';
import {AutoSave} from './utils_pyscript';

const App = () => {
	const [isAutoSaveOn, setIsAutoSaveOn] = React.useState(false);
	const [pendingAutoSaveState, setPendingAutoSaveState] = React.useState(isAutoSaveOn);
	const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(null);
	const [minutes, setMinutes] = React.useState<number>(5);
	const [OkClicked, setOkClicked] = React.useState(false);

	const handleSwitchChange = (event:any) => {
		setPendingAutoSaveState(event.target.checked);
	};

	React.useEffect(() => {
		if (OkClicked) {
		  if (intervalId) {
			clearInterval(intervalId);
		  }
	
		  if (isAutoSaveOn) {
			const newIntervalId = setInterval(() => {
			  AutoSave();
			  console.log('AutoSave');
			}, minutes * 60 * 1000);
	
			setIntervalId(newIntervalId);
	
			return () => {
			  clearInterval(newIntervalId);
			};
		  }
		  setOkClicked(false); // Reset okClicked
		}
	  }, [OkClicked, isAutoSaveOn, minutes]);

	const handleOkClick = (event:any) => {
		setIsAutoSaveOn(pendingAutoSaveState);
		setOkClicked(true);
	};

	const handleMinuteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(event.target.value);
		if (!isNaN(value) && value > 0) {
			setMinutes(value);
		}
	}
	
	return (
		<Moaui.Panel variant='box' relative width={640} height={120}>
			<Moaui.FloatingBox {...{x: 320,y: 0,width: 320,height: 88,guideBoxProps: {"width":"inherit","height":"inherit","id":"1-FloatingBox-aa1a587e","spacing":1,"center":true},}}>
				<Moaui.Switch {...{id: 'ID_SWITCH',checked: false,label: 'Auto Save',disabled: false,}}
				onChange={handleSwitchChange}
				checked={pendingAutoSaveState}
				/>
			</Moaui.FloatingBox>
			<Moaui.FloatingBox {...{x: 0,y: 88,width: 320,height: 32,guideBoxProps: {"width":"inherit","height":"inherit","id":"2-FloatingBox-c9446c1e","spacing":1,"row":true,"verBottom":true,"horLeft":true},}}>
				<Moaui.Button {...{id: 'ID_OK',disabled: false,width: '320px',loading: false,variant: 'contained',color: 'normal',}} onClick={handleOkClick}>OK</Moaui.Button>
			</Moaui.FloatingBox>
			<Moaui.FloatingBox {...{x: 320,y: 88,width: 320,height: 32,guideBoxProps: {"width":"inherit","height":"inherit","id":"3-FloatingBox-5eaa43b8","spacing":6,"verBottom":true},}}>
				<Moaui.Button {...{id: 'ID_CANCEL',disabled: false,width: '320px',loading: false,variant: 'contained',color: 'normal',}}>CANCEL</Moaui.Button>
			</Moaui.FloatingBox>
			<Moaui.FloatingBox {...{x: 160,y: 0,width: 160,height: 88,guideBoxProps: {"width":"inherit","height":"inherit","id":"4-FloatingBox-c08ec999","center":true},}}>
				<Moaui.Typography {...{width: '100',height: '200',verTop: false,verCenter: false,verBottom: false,horLeft: false,horCenter: false,horRight: false,center: false,variant: 'h1',color: 'primary',size: 'medium',}}>/Min.</Moaui.Typography>
			</Moaui.FloatingBox>
			<Moaui.FloatingBox {...{x: 0,y: 0,width: 160,height: 88,guideBoxProps: {"width":"inherit","height":"inherit","id":"5-FloatingBox-0c5b34c2","center":true},}}>
				<Moaui.TextField {...{id: 'ID_MINUTE',autoFocus: false,type: 'text',title: '',titlePosition: 'left',error: false,disabled: false,wrappedWidth: '150px',width: '100px',height: '30px',spacing: 1,textAlign: 'right',multiline: false,rows: 1,maxRows: 1,}}
					onChange={handleMinuteChange}
					defaultValue={minutes.toString()}
				/>
			</Moaui.FloatingBox>
		</Moaui.Panel>
	);
};

export default App;