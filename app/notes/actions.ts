"use server";
import { INote } from "@/lib/models/Note";
import Note from "@/lib/models/Note";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
// {
//   "tldr": "Machine Learning is a branch of AI where systems learn from data without explicit programming. It is divided into three main paradigms — supervised, unsupervised, and reinforcement learning — and is evaluated using metrics like accuracy, precision, recall, and F1 score. A key challenge is balancing bias and variance to avoid underfitting or overfitting.",
//   "keyConcepts": [
//     "Supervised Learning: training on labeled input-output pairs (e.g. regression, classification)",
//     "Unsupervised Learning: finding hidden structure in unlabeled data (e.g. clustering, PCA)",
//     "Reinforcement Learning: agent learns via rewards/penalties from environment interaction",
//     "Overfitting: model memorizes training data, fails to generalize (high variance)",
//     "Underfitting: model too simple to capture patterns (high bias)",
//     "Bias-Variance Tradeoff: Total Error = Bias² + Variance + Irreducible Noise",
//     "Gradient Descent: iterative optimization algorithm to minimize the cost function",
//     "Cross-validation: technique to evaluate model generalization (e.g. K-Fold)",
//     "Precision vs Recall: tradeoff relevant in imbalanced classification problems",
//     "Learning Rate (α): controls step size in gradient descent; too high = diverge, too low = slow"
//   ],
//   "formulas": [
//     "MSE = (1/n) * Σ(yᵢ - ŷᵢ)²",
//     "σ(x) = 1 / (1 + e^(-x))  [Sigmoid function]",
//     "θ = θ - α * ∇J(θ)  [Gradient Descent update rule]",
//     "P(A|B) = P(B|A) * P(A) / P(B)  [Bayes Theorem]",
//     "F1 = 2 * (Precision * Recall) / (Precision + Recall)",
//     "Accuracy = (TP + TN) / (TP + TN + FP + FN)",
//     "Precision = TP / (TP + FP)",
//     "Recall = TP / (TP + FN)"
//   ],
//   "examTopics": [
//     "Differences between supervised, unsupervised, and reinforcement learning",
//     "When to use classification vs. regression",
//     "How gradient descent minimizes a cost function",
//     "Overfitting vs. underfitting and remedies (regularization, dropout, cross-validation)",
//     "The purpose and formula of the sigmoid function in logistic regression",
//     "K-Fold cross-validation and why it matters",
//     "The role of the learning rate (α) in training convergence",
//     "Precision vs. Recall vs. F1 Score and when to prioritize each"
//   ]
// }

export async function createNote(data: {
    userId: string, 
    title: INote["title"], 
    sourceType: INote["sourceType"], 
    rawText: INote["rawText"], 
    summary: INote["summary"],
    fileKey?: INote["fileKey"], 
    sourceUrl?: INote["sourceUrl"], 
}) {

    const session = await getSession(); 
    if (!session?.user || session.user.id != data.userId) {
        return { error: "Unauthorized" };
    }

    await connectDB();

    try {
        const note = await Note.create({
            userId: data.userId,
            title: data.title,
            sourceType: data.sourceType,
            rawText: data.rawText,
            summary: data.summary,
            ...(data.fileKey && { fileKey: data.fileKey }),
            ...(data.sourceUrl && { sourceUrl: data.sourceUrl }),
        });

        return { success: true, noteId: note._id.toString() };
    } catch (err) {
        console.error("Failed to create note:", err);
        return { error: "Failed to create note" };
    }
}