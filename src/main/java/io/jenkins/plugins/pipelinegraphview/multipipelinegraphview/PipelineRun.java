package io.jenkins.plugins.pipelinegraphview.multipipelinegraphview;

import hudson.model.Result;
import io.jenkins.plugins.pipelinegraphview.utils.AbstractPipelineNode;
import org.jenkinsci.plugins.workflow.job.WorkflowRun;

public class PipelineRun {

    private String id;
    private String displayName;
    private String duration;
    private String result;
    private Long startTime;

    public PipelineRun(WorkflowRun run) {
        this.id = run.getId();
        this.displayName = run.getDisplayName();
        this.duration = AbstractPipelineNode.getUserFriendlyDuration(run.getDuration());
        Result buildResult = run.getResult();
        this.result = (buildResult != null) ? buildResult.toString() : "IN_PROGRESS";
        this.startTime = run.getStartTimeInMillis();
    }

    public String getId() {
        return id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDuration() {
        return duration;
    }

    public String getResult() {
        return result;
    }

    public Long getStartTime() {
        return startTime;
    }
}