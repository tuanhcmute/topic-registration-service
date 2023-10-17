import { NextFunction, Request, Response, query } from "express";
import { TopicInstance } from "@models";
import { TopicService } from "@services";
import { error } from "console";

export default class TopicController {
  private topicService: TopicService = new TopicService();

  public getAllTopics = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const type = req.query.type as string;
      const periodId = req.query["enrollment-period"] as string;
      const topics: TopicInstance[] = await this.topicService.getAllTopics(
        type,
        periodId
      );
      res.status(200).json(topics);
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
