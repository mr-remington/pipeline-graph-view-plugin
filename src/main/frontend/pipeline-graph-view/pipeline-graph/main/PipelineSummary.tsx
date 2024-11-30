import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from '@mui/material';
import { formatDateTime } from '../../../common/TimeConverters';
import { Result } from './PipelineGraphModel';
import { SvgStatus } from './support/SvgStatus';
import { RunInfo } from '../../../multi-pipeline-graph-view/multi-pipeline-graph/main/MultiPipelineGraphModel';

interface PipelineSummaryProps {
  run: RunInfo;
  onClick: () => void;
}
const MAX_DISPLAY_NAME_LENGTH = 24

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  paddingTop: '2px',
})

const StyledCard = styled(Card)({
  background: 'transparent',
  boxShadow: 'none',
  marginBottom: '5px',
  borderRadius: '1rem',
  '::selection': {
    backgroundColor: 'var(--selection-color)',
  },
});

const StyledCardActionArea = styled(CardActionArea)({
  paddingLeft: '0.8rem',
  paddingRight: '0.8rem',
})

const StyledTooltip = styled(({ className, ...props }: TooltipProps & { className?: string }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'var(--white)',
    border: '1px solid var(--light-grey);',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    color: 'black',
    fontSize: '0.875rem',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'var(--light-grey)',
    marginTop: '8px',
  },
}));

const PrimaryText = styled(Typography)(({ theme }) => ({
  color: 'var(--text-color)',
  fontSize: 'var(--font-size-xs)',
}));

const SecondaryText = styled(Typography)(({ theme }) => ({
  color: 'var(--text-color-secondary)',
  fontSize: 'var(--font-size-xs)',
  whiteSpace: 'nowrap',
}));

export class PipelineSummary extends React.Component<PipelineSummaryProps> {
  render() {
    const { displayName, result, startTime, duration } = this.props.run;

    const truncatedDisplayName =
      displayName.length > MAX_DISPLAY_NAME_LENGTH
        ? `${displayName.slice(0, MAX_DISPLAY_NAME_LENGTH)}...`
        : displayName;
    const fullTimeStamp = formatDateTime(startTime, 'full')
    const shortTimeStamp = formatDateTime(startTime, 'short')

    const pipelineResult = Result[result as keyof typeof Result] || Result.unknown; 

    return (
      <StyledCard>
        <StyledCardActionArea onClick={this.props.onClick}>
          <StyledBox>
            <StyledTooltip 
              title={
                <PrimaryText>
                  {pipelineResult.charAt(0).toUpperCase() + pipelineResult.slice(1)}
                </PrimaryText>
              }
            >
              <div>
                <SvgStatus result={pipelineResult} radius={8} outerStyle={{ transform: undefined }} />
              </div>
            </StyledTooltip>

            <Typography
              noWrap
              sx={{
                color: 'var(--table-body-foreground)',
                fontSize: 'var(--link-font-weight)',
              }}
            >
              {truncatedDisplayName}
            </Typography>
          </StyledBox>
          <CardContent
            sx={{
              paddingLeft: '22px',
              paddingTop: '0px',
              paddingBottom: '0px',
              paddingRight: '0px',
            }}
          >
            <StyledTooltip
              title={
                <>
                  <PrimaryText>{displayName}</PrimaryText>
                  <Divider/>
                  <SecondaryText>Started {fullTimeStamp}</SecondaryText>
                  <SecondaryText>Took {duration}</SecondaryText>
                </>
              }
            >
              <SecondaryText>
                {shortTimeStamp} - {duration}
              </SecondaryText>
            </StyledTooltip>
          </CardContent>
        </StyledCardActionArea>
      </StyledCard>
    );
  }
}