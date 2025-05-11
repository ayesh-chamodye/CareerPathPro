import * as tf from '@tensorflow/tfjs';
import { CareerInput } from '@shared/schema';

// This is a simple machine learning model for career recommendations
// In a production environment, this would be more sophisticated

interface TrainingData {
  input: number[];  // Encoded features
  output: number[]; // Encoded career matches 
}

class CareerRecommendationModel {
  private model: tf.Sequential | null = null;
  private inputFeatures: string[] = [
    'stream_science', 'stream_commerce', 'stream_arts', 'stream_technology',
    'subject_physics', 'subject_chemistry', 'subject_biology', 'subject_mathematics',
    'subject_economics', 'subject_business', 'subject_accounting', 'subject_it',
    'interest_technology', 'interest_healthcare', 'interest_business', 'interest_engineering',
    'interest_creative', 'interest_education', 'interest_law', 'interest_science',
    'interest_environment'
  ];
  
  private careerOutputs: string[] = [
    'software_engineering', 'data_science', 'medical', 'civil_engineering',
    'business_analyst', 'marketing', 'law', 'education', 'research_scientist'
  ];
  
  constructor() {
    this.initModel();
  }
  
  private initModel(): void {
    this.model = tf.sequential();
    
    // Add layers to the model
    this.model.add(tf.layers.dense({
      inputShape: [this.inputFeatures.length],
      units: 32,
      activation: 'relu'
    }));
    
    this.model.add(tf.layers.dense({
      units: 16,
      activation: 'relu'
    }));
    
    this.model.add(tf.layers.dense({
      units: this.careerOutputs.length,
      activation: 'sigmoid'
    }));
    
    // Compile the model
    this.model.compile({
      optimizer: tf.train.adam(0.01),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy']
    });
  }
  
  // Encode input data from form
  private encodeInput(input: CareerInput): number[] {
    const encoded = new Array(this.inputFeatures.length).fill(0);
    
    // Encode stream
    const streamIndex = this.inputFeatures.findIndex(f => f === `stream_${input.stream}`);
    if (streamIndex >= 0) encoded[streamIndex] = 1;
    
    // Encode subjects
    input.subjects.forEach(subject => {
      const subjectIndex = this.inputFeatures.findIndex(f => 
        f.startsWith('subject_') && f.includes(subject.name.split(' ')[0].toLowerCase())
      );
      if (subjectIndex >= 0) {
        // Grade value from A=4 to F=0
        const gradeValue = ['A', 'B', 'C', 'S', 'F'].indexOf(subject.grade);
        const normalizedGrade = gradeValue !== -1 ? (4 - gradeValue) / 4 : 0;
        encoded[subjectIndex] = normalizedGrade;
      }
    });
    
    // Encode interests
    input.interests.forEach(interest => {
      const interestIndex = this.inputFeatures.findIndex(f => f === `interest_${interest}`);
      if (interestIndex >= 0) encoded[interestIndex] = 1;
    });
    
    return encoded;
  }
  
  // Predict career matches
  async predict(input: CareerInput): Promise<Record<string, number>> {
    if (!this.model) {
      throw new Error('Model not initialized');
    }
    
    const encodedInput = this.encodeInput(input);
    const tensorInput = tf.tensor2d([encodedInput]);
    
    const prediction = await this.model.predict(tensorInput) as tf.Tensor;
    const predictionData = await prediction.data();
    
    // Clean up tensors
    tensorInput.dispose();
    prediction.dispose();
    
    // Map prediction values to career names
    const result: Record<string, number> = {};
    this.careerOutputs.forEach((career, index) => {
      result[career] = predictionData[index] * 100; // Convert to percentage
    });
    
    return result;
  }
  
  // Train the model with sample data
  // In a real app, this would use a pre-trained model or train server-side
  async trainWithSampleData(): Promise<void> {
    if (!this.model) {
      throw new Error('Model not initialized');
    }
    
    // Sample training data
    const trainingData: TrainingData[] = [
      // Example for software engineering student
      {
        input: [1, 0, 0, 0, 0.75, 0.5, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0],
        output: [1, 0.8, 0, 0.3, 0.4, 0.1, 0, 0, 0.5]
      },
      // Example for medical student
      {
        input: [1, 0, 0, 0, 0.5, 1, 1, 0.5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
        output: [0, 0.1, 1, 0, 0, 0, 0, 0.2, 0.6]
      },
      // Example for business student
      {
        input: [0, 1, 0, 0, 0, 0, 0, 0.5, 1, 1, 1, 0.5, 0.3, 0, 1, 0, 0, 0, 0, 0, 0],
        output: [0.1, 0.4, 0, 0, 0.9, 0.8, 0.2, 0, 0]
      }
      // Add more examples as needed
    ];
    
    // Prepare tensors
    const inputs = tf.tensor2d(trainingData.map(data => data.input));
    const outputs = tf.tensor2d(trainingData.map(data => data.output));
    
    // Train the model
    await this.model.fit(inputs, outputs, {
      epochs: 100,
      batchSize: 32,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch}: loss = ${logs?.loss}`);
        }
      }
    });
    
    // Clean up tensors
    inputs.dispose();
    outputs.dispose();
  }
}

// Export a singleton instance
export const careerModel = new CareerRecommendationModel();

export function predictRelevance(resource: any, selectedField: string): number {
  // Ensure selectedField and resource.description are defined
  if (!selectedField || !resource?.description) {
    return 0; // Return 0 relevance if either is undefined
  }

  // Example ML logic: Calculate relevance based on matching keywords in the resource description and selected field
  const keywords = selectedField.toLowerCase().split(" ");
  const description = resource.description.toLowerCase();

  const matches = keywords.filter((keyword) => description.includes(keyword));
  const relevanceScore = matches.length / keywords.length;

  return relevanceScore; // Return a score between 0 and 1
}
