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
const imagesPath = document.head.dataset.imagesurl;

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

  const handleNodeClick = (nodeName: string, id: number) => {
    console.log(nodeName, id);
    let redirect = `../${run.id}/pipeline-console?selected-node=${id}`;
    if (onJobView) {
      redirect = `${run.id}/pipeline-console?selected-node=${id}`;
    }
    window.location.href = redirect;
  };

  const formattedStartTime = formatEpochToLocalTime(run.startTime);
  const iconOuterClassName = run.result === "IN_PROGRESS" ? "in-progress" : "static";
  const statusColor = `${run.result.toLowerCase()}`;

  return (
    <tr>
      <td className="PWGx-PipelineGraph-summary-container">
        <a href={singleRunPage} className={`PWGx-PipelineHeader-overview-pane ${statusColor}`}>
          <p className="PWGx-PipelineHeader-overview-link">{run.displayName}</p>
        </a>
        <div className="durations">
          <div className="start-time">{formattedStartTime}</div>
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
      <td className="PWGx-PipelineGraph-summary-container">
        <div className="took">{run.result === "IN_PROGRESS" ? "Running..." : run.duration}</div>
      </td>
    </tr>
  );
};
