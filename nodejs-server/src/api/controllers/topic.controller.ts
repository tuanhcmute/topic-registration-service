import { NextFunction, Request, Response, query } from "express";
import { TopicService } from "@services";
import { error } from "console";
import { TeacherTopicOut } from "@interfaces/topic.interface";
import { StatusCodes } from "http-status-codes";
import { ResponseModelBuilder } from "@interfaces";

export default class TopicController {
  private topicService: TopicService = new TopicService();

  public getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const email = res.locals.email;
      const type = req.query.type as string;
      const topics: TeacherTopicOut[] =
        await this.topicService.getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture(
          type,
          email
        );
      res
        .status(StatusCodes.OK)
        .json(
          new ResponseModelBuilder<TeacherTopicOut[]>()
            .withStatusCode(StatusCodes.OK)
            .withMessage("Topics have been successfully retrieved")
            .withData(topics)
        );
    } catch (err) {
      console.log(error);
      next(err);
    }
  };

  //   public async createTopic(req: Request, res: Response): Promise<void> {
  //     const { name, description } = req.body;
  //     const newTopic: Topic = new Topic({ name, description });

  //     try {
  //       await newTopic.save();
  //       res.status(201).json(newTopic);
  //     } catch (err) {
  //       res.status(400).json({ message: err.message });
  //     }
  //   }

  //   public async getTopicById(req: Request, res: Response): Promise<void> {
  //     const { id } = req.params;

  //     try {
  //       const topic: Topic | null = await Topic.findById(id);
  //       if (topic) {
  //         res.status(200).json(topic);
  //       } else {
  //         res.status(404).json({ message: "Topic not found" });
  //       }
  //     } catch (err) {
  //       res.status(500).json({ message: err.message });
  //     }
  //   }

  //   public async updateTopic(req: Request, res: Response): Promise<void> {
  //     const { id } = req.params;
  //     const { name, description } = req.body;

  //     try {
  //       const updatedTopic: Topic | null = await Topic.findByIdAndUpdate(
  //         id,
  //         { name, description },
  //         { new: true }
  //       );
  //       if (updatedTopic) {
  //         res.status(200).json(updatedTopic);
  //       } else {
  //         res.status(404).json({ message: "Topic not found" });
  //       }
  //     } catch (err) {
  //       res.status(500).json({ message: err.message });
  //     }
  //   }

  //   public async deleteTopic(req: Request, res: Response): Promise<void> {
  //     const { id } = req.params;

  //     try {
  //       const deletedTopic: Topic | null = await Topic.findByIdAndDelete(id);
  //       if (deletedTopic) {
  //         res.status(200).json(deletedTopic);
  //       } else {
  //         res.status(404).json({ message: "Topic not found" });
  //       }
  //     } catch (err) {
  //       res.status(500).json({ message: err.message });
  //     }
  //   }
}
