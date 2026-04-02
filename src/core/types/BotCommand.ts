import {
  type ApplicationCommandData,
  type ApplicationCommandOptionChoiceData,
  type ApplicationCommandOptionData,
  type AutocompleteInteraction,
  type ButtonInteraction,
  type ChatInputCommandInteraction,
  type Collection,
  type MessageContextMenuCommandInteraction,
  type ModalSubmitInteraction,
  type StringSelectMenuInteraction,
  type UserContextMenuCommandInteraction,
} from "discord.js";

type GenericCommandOptions = object;

interface BotCommandData<T extends GenericCommandOptions> {
  data: ApplicationCommandData;
  options?: T;
  subcommands?: Collection<string, Subcommand<T>>;
}

interface SubcommandData<T extends GenericCommandOptions> {
  data: ApplicationCommandOptionData;
  options?: T;
  parent: BotCommand<T>;
  subcommandGroup?: string;
}

abstract class BaseCommand<T extends GenericCommandOptions> {
  readonly options?: T;

  protected constructor(options?: T) {
    this.options = options;
  }

  hasOption(optionName: keyof T): boolean {
    return this.options ? optionName in this.options : false;
  }

  getOption<K extends keyof T>(optionName: K): T[K] | undefined {
    return this.options ? this.options[optionName] : undefined;
  }

  messageContextMenu?(interaction: MessageContextMenuCommandInteraction): Promise<void>;
  userContextMenu?(interaction: UserContextMenuCommandInteraction): Promise<void>;
  chatInput?(interaction: ChatInputCommandInteraction): Promise<void>;
  button?(interaction: ButtonInteraction, args: string[]): Promise<void>;
  modalSubmit?(interaction: ModalSubmitInteraction, args: string[]): Promise<void>;
  stringSelect?(interaction: StringSelectMenuInteraction, args: string[]): Promise<void>;
  autocomplete?(interaction: AutocompleteInteraction): Promise<ApplicationCommandOptionChoiceData[]>;
}

export abstract class BotCommand<T extends GenericCommandOptions = GenericCommandOptions> extends BaseCommand<T> {
  readonly data: ApplicationCommandData;
  readonly subcommands?: Collection<string, Subcommand<T>>;

  protected constructor(data: BotCommandData<T>) {
    super(data.options);
    this.data = data.data;
  }
}

export abstract class Subcommand<T extends GenericCommandOptions = GenericCommandOptions> extends BaseCommand<T> {
  readonly data: ApplicationCommandOptionData;
  readonly parent: BotCommand<T>;
  readonly subcommandGroup?: string;

  protected constructor(data: SubcommandData<T>) {
    super(data.options);
    this.data = data.data;
    this.subcommandGroup = data.subcommandGroup;
    this.parent = data.parent;
  }
}
