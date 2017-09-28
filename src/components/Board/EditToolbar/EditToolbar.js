import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import AddBoxIcon from 'material-ui-icons/AddBox';
import SettingsIcon from 'material-ui-icons/Settings';

import messages from './messages';
import './EditToolbar.css';

EditToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  intl: intlShape.isRequired,
  isItemsSelected: PropTypes.bool,
  onSelectClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onAddClick: PropTypes.func,
  onSettingsClick: PropTypes.func
};

EditToolbar.defaultProps = {
  className: ''
};

const styles = {
  keyboardFocused: {
    backgroundColor: 'rgba(0,0,0,0)'
  }
};

function EditToolbar({
  className,
  classes,
  intl,
  isItemsSelected,
  isSelecting,
  onDeleteClick,
  onEditClick,
  onAddClick,
  onSettingsClick,
  onSelectClick
}) {
  return (
    <div
      className={classNames(className, 'EditToolbar', {
        'EditToolbar--selecting': isSelecting
      })}
    >
      <div className="EditToolbar__group EditToolbar__group--start">
        <Button color="contrast" onClick={onSelectClick}>
          {!isSelecting && <FormattedMessage {...messages.select} />}
          {isSelecting && <FormattedMessage {...messages.cancel} />}
        </Button>
      </div>
      <div className="EditToolbar__group EditToolbar__group--end">
        {isSelecting && (
          <div>
            <IconButton
              focusRipple={true}
              classes={{ keyboardFocused: classes.keyboardFocused }}
              aria-label={intl.formatMessage(messages.delete)}
              title={intl.formatMessage(messages.delete)}
              disabled={!isItemsSelected}
              onClick={onDeleteClick}
              color="contrast"
              style={{
                opacity: isItemsSelected ? 1 : 0.3
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              focusRipple={true}
              classes={{ keyboardFocused: classes.keyboardFocused }}
              aria-label={intl.formatMessage(messages.edit)}
              title={intl.formatMessage(messages.edit)}
              disabled={!isItemsSelected}
              onClick={onEditClick}
              color="contrast"
              style={{
                opacity: isItemsSelected ? 1 : 0.3
              }}
            >
              <EditIcon />
            </IconButton>
          </div>
        )}
        {!isSelecting && (
          <div>
            <IconButton
              focusRipple={true}
              classes={{ keyboardFocused: classes.keyboardFocused }}
              aria-label={intl.formatMessage(messages.add)}
              title={intl.formatMessage(messages.add)}
              color="contrast"
              onClick={onAddClick}
            >
              <AddBoxIcon />
            </IconButton>
            <IconButton
              focusRipple={true}
              classes={{ keyboardFocused: classes.keyboardFocused }}
              aria-label={intl.formatMessage(messages.settings)}
              title={intl.formatMessage(messages.settings)}
              color="contrast"
              onClick={onSettingsClick}
            >
              <SettingsIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default injectIntl(
  withStyles(styles, { name: 'EditToolbar' })(EditToolbar)
);
