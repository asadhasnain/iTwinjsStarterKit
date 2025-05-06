import { SvgInfoCircular, SvgNews, SvgSettings, SvgSmileyHappy } from "@itwin/itwinui-icons-react"
import { MenuItem } from "@itwin/itwinui-react"

export const MenuItems = () => {
    return (<>
        <MenuItem key='settings' startIcon={<SvgSettings />}>
                Settings
        </MenuItem>
        <MenuItem key='feedback' startIcon={<SvgSmileyHappy />}>
            Feedback
        </MenuItem>
        <MenuItem key='whats-new' startIcon={<SvgNews />}>
            {`What's new`}
        </MenuItem>
        <MenuItem key='about' startIcon={<SvgInfoCircular />}>
            About
        </MenuItem>
    </>);
}