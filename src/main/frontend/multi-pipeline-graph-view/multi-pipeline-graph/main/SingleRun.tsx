import React, { useState } from "react";
import { RunInfo } from "./MultiPipelineGraphModel";
import formatEpochToLocalTime from "./support/formatEpochToLocalTime";
import {
  PipelineGraph,
  StageInfo,
} from "../../../pipeline-graph-view/pipeline-graph/main";

interface Props {
  run: RunInfo;
}

export const SingleRun: (data: Props) => JSX.Element = ({ run }) => {
  const [stages, setStages] = useState<Array<StageInfo>>([]);
  let path = `tree?runId=${run.id}`;

  const onJobView = !window.location.href.endsWith("multi-pipeline-graph/");
  if (onJobView) {
    path = `multi-pipeline-graph/${path}`;
  }

  let singleRunPage = `../${run.id}/pipeline-graph/`;
  if (onJobView) {
    singleRunPage = `${run.id}/pipeline-graph/`;
  }
  console.log(run)
  const handleNodeClick = (nodeName: string, id: number) => {
    console.log(nodeName, id);
    let redirect = `../${run.id}/pipeline-console?selected-node=${id}`;
    if (onJobView) {
      redirect = `${run.id}/pipeline-console?selected-node=${id}`;
    }
    window.location.href = redirect;
  };

  const formattedStartTime = formatEpochToLocalTime(run.startTime);

  return (
    <tr>
      <td className="PWGx-PipelineGraph-summary-container">
        <div className="cell-box">
          <div className="jobName">
            <span className={`badge ${run.result.toLowerCase()}`}>
              <a href={singleRunPage} className="build-link">
                {run.displayName}
              </a>
            </span>
          </div>
          <div className="durations">
            <div className="start-time">{formattedStartTime}</div>
            <div className="took">{run.duration}</div>
          </div>
        </div>
        
      </td>
      <td>
        <PipelineGraph
          stages={stages}
          setStages={setStages}
          onNodeClick={handleNodeClick}
          path={path}
          collapsed={true}
        />
      </td>
    </tr>
  );
};
